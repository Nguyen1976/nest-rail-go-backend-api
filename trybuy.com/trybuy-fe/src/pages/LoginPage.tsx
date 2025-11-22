
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Github, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    try {
      // Hàm login từ context giờ đây sẽ xử lý cuộc gọi API
      await login(data);
      // Nếu thành công, AuthContext sẽ tự động điều hướng
    } catch (error: any) {
      // Nếu thất bại, hàm login trong context sẽ throw lỗi và chúng ta bắt nó ở đây
      setApiError(error.response?.data?.message || 'Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">ReviewDev</h1>
          <p className="text-gray-400">Đăng nhập để chia sẻ và khám phá</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          {apiError && (
            <div className="bg-red-900/40 border border-red-700 text-red-300 p-3 rounded-md mb-6 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300">Username or Email</label>
              <div className="mt-2 relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  {...register('username', { required: 'Username or Email is required.' })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  placeholder="your_username or you@example.com"
                />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
              <div className="mt-2 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password', { required: 'Password is required.' })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-md transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-gray-800 px-2 text-gray-400">Hoặc tiếp tục với</span></div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-md transition-colors"
            >
              <Github size={20} />
              <span>Đăng nhập với GitHub</span>
            </button>
          </div>

          <div className="text-center mt-6 text-sm">
            <p className="text-gray-400">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}