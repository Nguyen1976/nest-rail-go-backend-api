import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import CreateReviewPage from './pages/CreateReviewPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/review/:reviewId" element={<ReviewDetailPage />} />
        <Route 
          path="/create"
          element={
            <ProtectedRoute>
              <CreateReviewPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}