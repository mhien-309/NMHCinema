import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cinema Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Film size={24} />
              <h3 className="text-xl font-semibold">NMH Cinema</h3>
            </div>
            <p className="mb-4 text-red-100">
              Trải nghiệm điện ảnh đẳng cấp với công nghệ hiện đại và dịch vụ chất lượng cao.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-red-200 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-red-100 hover:text-white transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="text-red-100 hover:text-white transition-colors">
                  Phim Sắp Chiếu
                </Link>
              </li>
              <li>
                <a href="#" className="text-red-100 hover:text-white transition-colors">
                  Khuyến Mãi
                </a>
              </li>
              <li>
                <a href="#" className="text-red-100 hover:text-white transition-colors">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-red-100 hover:text-white transition-colors">
                  Chính Sách Bảo Mật
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-red-200 mt-1" />
                <p className="text-red-100">123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-red-200" />
                <p className="text-red-100">+84 123 456 789</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-red-200" />
                <p className="text-red-100">info@nmhcinema.vn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-red-700 mt-8 pt-6 text-center text-red-200">
          <p>&copy; {new Date().getFullYear()} NMH Cinema. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;