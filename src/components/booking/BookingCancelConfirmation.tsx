import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Booking, Movie } from '../../types';

interface BookingCancelConfirmationProps {
  booking: Booking;
  movie: Movie;
  onCancel: () => void;
  onConfirm: () => void;
}

const BookingCancelConfirmation: React.FC<BookingCancelConfirmationProps> = ({
  booking,
  movie,
  onCancel,
  onConfirm
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <AlertTriangle className="text-red-500 w-6 h-6 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Xác Nhận Hủy Đặt Vé</h2>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Bạn có chắc chắn muốn hủy đặt vé này không? Thao tác này không thể hoàn tác.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">{movie.vietnameseTitle}</h3>
              <p className="text-gray-600 mb-1">Mã đặt vé: {booking.id}</p>
              <p className="text-gray-600 mb-1">Tổng tiền: {formatPrice(booking.totalPrice)}</p>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Lưu ý: Việc hoàn tiền sẽ được xử lý theo chính sách của NMH Cinema và có thể mất từ 3-5 ngày làm việc.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Giữ Vé
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Xác Nhận Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCancelConfirmation;