import React, { useEffect } from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Đăng Ký - NMH Cinema';
    
    // Cleanup
    return () => {
      document.title = 'NMH Cinema';
    };
  }, []);

  return (
    <div className="min-h-screen bg-red-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;