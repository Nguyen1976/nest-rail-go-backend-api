import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Người dùng chưa đăng nhập, chuyển hướng về trang login
    return <Navigate to="/login" />;
  }

  return children;
};