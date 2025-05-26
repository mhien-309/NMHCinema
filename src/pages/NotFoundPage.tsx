import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Film, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Trang Không Tồn Tại - NMH Cinema';
    
    // Cleanup
    return () => {
      document.title = 'NMH Cinema';
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center bg-red-50 p-4">
      <div className="text-center max-w-md">
        <Film size={64} className="mx-auto text-red-600 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trang Không Tồn Tại</h2>
        <p className="text-gray-600 mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <Home size={18} className="mr-2" />
          Về Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;