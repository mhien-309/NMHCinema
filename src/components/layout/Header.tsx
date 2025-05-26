import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, Film, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-red-100 to-red-200 shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-red-700 hover:text-red-800 transition-colors">
            <Film size={28} />
            <span className="text-2xl font-semibold">NMH Cinema</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-red-700 hover:text-red-900 font-medium transition-colors">
              Trang Chủ
            </Link>
            <Link to="/coming-soon" className="text-red-700 hover:text-red-900 font-medium transition-colors">
              Sắp Chiếu
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-red-700 hover:text-red-900 font-medium transition-colors">
                  <User size={18} />
                  <span>{currentUser?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50">
                    Lịch Sử Đặt Vé
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                  >
                    Đăng Xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-colors">
                Đăng Nhập
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-red-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3">
            <Link 
              to="/" 
              className="block text-red-700 py-2 hover:bg-red-50 px-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang Chủ
            </Link>
            <Link 
              to="/coming-soon" 
              className="block text-red-700 py-2 hover:bg-red-50 px-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sắp Chiếu
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/history" 
                  className="block text-red-700 py-2 hover:bg-red-50 px-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Lịch Sử Đặt Vé
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center text-red-700 py-2 hover:bg-red-50 px-2 rounded w-full"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Đăng Xuất ({currentUser?.name})</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng Nhập
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;