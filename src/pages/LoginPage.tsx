import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title
    document.title = 'Đăng Nhập - NMH Cinema';
    
    // Cleanup
    return () => {
      document.title = 'NMH Cinema';
    };
  }, []);
  
  // Check if there's a redirect path in location state
  const redirectMessage = location.state && location.state.redirectTo 
    ? 'Vui lòng đăng nhập để tiếp tục.'
    : null;

  return (
    <div className="min-h-screen bg-red-50 py-12">
      <div className="container mx-auto px-4">
        {redirectMessage && (
          <div className="max-w-md mx-auto mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <p className="text-yellow-700">{redirectMessage}</p>
          </div>
        )}
        
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;