
import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../lib/mockData';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000'; 



const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};


interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean; // status loading
  login: (loginData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // loading=true
  const navigate = useNavigate();

  // Kiểm tra token khi start app
  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAuthToken(token);
        try {
          // Tạo một endpoint /users/me để lấy thông tin user: Khi login thành công mới lấy nha Anh Em
          const response = await axios.get(`${API_BASE_URL}/users/me`);
          setUser(response.data.data);
        } catch (error) {
          // Token không hợp lệ hoặc hết hạn
          localStorage.removeItem('accessToken');
          setAuthToken(null);
        }
      }
      setIsLoading(false);
    };
    loadUserFromToken();
  }, []);

  const login = async (loginData: any) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    const { accessToken } = response.data.data;

    localStorage.setItem('accessToken', accessToken);
    setAuthToken(accessToken);

    // Lấy thông tin người dùng sau khi login thành công
    const userResponse = await axios.get(`${API_BASE_URL}/users/me`);
    setUser(userResponse.data.data);

    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthToken(null);
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
  };

  if (isLoading) {
    return <div>Loading Application...</div>; 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}