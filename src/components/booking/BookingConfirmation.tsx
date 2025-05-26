import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Movie, ShowTime, Seat } from '../../types';

interface BookingConfirmationProps {
  movie: Movie;
  showTime: ShowTime;
  selectedSeats: Seat[];
  onCancel: () => void;
  onConfirm: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  movie,
  showTime,
  selectedSeats,
  onCancel,
  onConfirm
}) => {
  const navigate = useNavigate();
  
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Xác Nhận Đặt Vé</h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">Phim:</h3>
              <p className="text-gray-900">{movie.vietnameseTitle}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">Suất Chiếu:</h3>
              <p className="text-gray-900">{formatDate(showTime.date)} - {showTime.time}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">Phòng:</h3>
              <p className="text-gray-900">{showTime.hall}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Ghế:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(seat => (
                  <span key={seat.id} className="bg-red-100 text-red-800 px-2 py-1 rounded-md">
                    {seat.row}{seat.number}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-700">Tổng Tiền:</span>
            <span className="text-xl font-bold text-red-600">{formatPrice(totalPrice)}</span>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Vui lòng kiểm tra thông tin trước khi xác nhận. Sau khi đặt vé, bạn có thể hủy vé trong vòng 30 phút.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <CheckCircle2 size={18} className="mr-2" />
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;