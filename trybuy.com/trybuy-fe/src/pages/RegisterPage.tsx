import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Github, Mail, User, Lock, KeyRound } from 'lucide-react';

type StepOneInputs = {
  email: string;
};

type StepTwoInputs = {
  username: string;
  nickname: string;
  password: string;
  otp: string;
};

const API_BASE_URL = 'http://localhost:3000'; // URL backend: Sau này sẽ config lên server... ANH EM chờ!!

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [emailForStepTwo, setEmailForStepTwo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form cho bước 1 (gửi email)
  const {
    register: registerStepOne,
    handleSubmit: handleSubmitStepOne,
    formState: { errors: errorsStepOne },
  } = useForm<StepOneInputs>();

  // Form cho bước 2 (đăng ký)
  const {
    register: registerStepTwo,
    handleSubmit: handleSubmitStepTwo,
    formState: { errors: errorsStepTwo },
  } = useForm<StepTwoInputs>();

  // Xử lý gửi OTP
  const onSendOtpSubmit: SubmitHandler<StepOneInputs> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await axios.post(`${API_BASE_URL}/auth/send-otp`, { email: data.email });
      setEmailForStepTwo(data.email);
      setCurrentStep(2); // Chuyển sang bước 2
    } catch (error: any) {
      setApiError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý đăng ký
  const onRegisterSubmit: SubmitHandler<StepTwoInputs> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    const registrationData = {
      ...data,
      email: emailForStepTwo, // Lấy email từ bước 1
    };

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, registrationData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error: any) {
      setApiError(error.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">TRYBUY</h1>
          <p className="text-gray-400">
            {currentStep === 1 ? 'Bước 1: Xác thực Email của bạn' : 'Bước 2: Hoàn tất thông tin'}
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          {apiError && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md mb-6 text-sm">
              {apiError}
            </div>
          )}

          {/* --- Form Bước 1: Gửi OTP --- */}
          {currentStep === 1 && (
            <form onSubmit={handleSubmitStepOne(onSendOtpSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <div className="mt-2 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    type="email"
                    {...registerStepOne('email', { required: 'Email is required' })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2.5 pl-10 pr-3 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
                {errorsStepOne.email && <p className="text-red-500 text-xs mt-1">{errorsStepOne.email.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-md transition-colors disabled:bg-gray-500"
              >
                {isLoading ? 'Đang gửi...' : 'Gửi mã xác thực'}
              </button>
            </form>
          )}

          {/* --- Form Bước 2: Đăng ký --- */}
          {currentStep === 2 && (
            <form onSubmit={handleSubmitStepTwo(onRegisterSubmit)} className="space-y-4">
              <p className="text-sm text-gray-300">Mã OTP đã được gửi đến <span className="font-bold text-white">{emailForStepTwo}</span>. Vui lòng kiểm tra hộp thư của bạn.</p>
              
              {/* OTP Input */}
              <div>
                <label htmlFor="otp" className="text-sm font-medium text-gray-300">Mã OTP *</label>
                <div className="mt-1 relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input id="otp" type="text" {...registerStepTwo('otp', { required: 'OTP is required' })} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2.5 pl-10 pr-3" />
                </div>
                {errorsStepTwo.otp && <p className="text-red-500 text-xs mt-1">{errorsStepTwo.otp.message}</p>}
              </div>
              
              {/* Username Input */}
              <div>
                <label htmlFor="username" className="text-sm font-medium text-gray-300">Username *</label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input id="username" type="text" {...registerStepTwo('username', { required: 'Username is required' })} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2.5 pl-10 pr-3" />
                </div>
                {errorsStepTwo.username && <p className="text-red-500 text-xs mt-1">{errorsStepTwo.username.message}</p>}
              </div>
              
              {/* Nickname Input */}
              <div>
                <label htmlFor="nickname" className="text-sm font-medium text-gray-300">Nickname *</label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input id="nickname" type="text" {...registerStepTwo('nickname', { required: 'Nickname is required' })} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2.5 pl-10 pr-3" />
                </div>
                {errorsStepTwo.nickname && <p className="text-red-500 text-xs mt-1">{errorsStepTwo.nickname.message}</p>}
              </div>
              
              {/* Password Input */}
              <div>
                <label htmlFor="password"className="text-sm font-medium text-gray-300">Password *</label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input id="password" type="password" {...registerStepTwo('password', { required: 'Password is required' })} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2.5 pl-10 pr-3" />
                </div>
                {errorsStepTwo.password && <p className="text-red-500 text-xs mt-1">{errorsStepTwo.password.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-md transition-colors disabled:bg-gray-500"
              >
                {isLoading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
              </button>
            </form>
          )}

          <div className="text-center mt-6 text-sm">
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Đã có tài khoản? Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}