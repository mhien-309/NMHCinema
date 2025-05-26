import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import BookingCancelConfirmation from '../components/booking/BookingCancelConfirmation';
import { Booking, Movie } from '../types';
import { Calendar, Clock, MapPin, Ticket, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const BookingHistoryPage: React.FC = () => {
  const { getUserBookings, getMovie, cancelBooking } = useMovies();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showCancellationConfirmation, setShowCancellationConfirmation] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: '/history' } });
      return;
    }
    
    // Get user bookings
    const userBookings = getUserBookings();
    setBookings(userBookings);
    
    // Check if coming from a new booking
    if (location.state && location.state.newBooking) {
      setShowSuccessAlert(true);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
    
    // Update document title
    document.title = 'Lịch Sử Đặt Vé - NMH Cinema';
    
    // Cleanup
    return () => {
      document.title = 'NMH Cinema';
    };
  }, [isAuthenticated, navigate, getUserBookings, location]);
  
  const handleCancelBooking = () => {
    if (!selectedBooking) return;
    
    cancelBooking(selectedBooking.id);
    setShowCancellationConfirmation(false);
    
    // Update bookings list
    const updatedBookings = bookings.filter(b => b.id !== selectedBooking.id);
    setBookings(updatedBookings);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Check if booking is cancellable (within 30 minutes)
  const isCancellable = (booking: Booking) => {
    const bookingTime = new Date(booking.bookingDate).getTime();
    const now = new Date().getTime();
    const timeDiff = now - bookingTime;
    const minutesDiff = timeDiff / (1000 * 60);
    
    return minutesDiff <= 30;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Lịch Sử Đặt Vé</h1>
      
      {showSuccessAlert && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-start">
          <CheckCircle2 className="text-green-500 w-5 h-5 mr-2 mt-0.5" />
          <div>
            <h3 className="text-green-800 font-semibold">Đặt vé thành công!</h3>
            <p className="text-green-700">
              Vé của bạn đã được đặt thành công. Chi tiết vé đã được thêm vào lịch sử đặt vé.
            </p>
          </div>
          <button 
            onClick={() => setShowSuccessAlert(false)}
            className="ml-auto text-green-500 hover:text-green-700"
          >
            <XCircle size={20} />
          </button>
        </div>
      )}
      
      {bookings.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <Ticket size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Bạn chưa có lịch sử đặt vé nào
          </h2>
          <p className="text-gray-600 mb-6">
            Hãy đặt vé xem phim để thưởng thức những bộ phim đang chiếu tại NMH Cinema.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Xem Phim Đang Chiếu
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => {
            const movie = getMovie(booking.movieId);
            if (!movie) return null;
            
            const canCancel = isCancellable(booking);
            
            return (
              <div 
                key={booking.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img
                      src={movie.posterUrl}
                      alt={movie.vietnameseTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-3/4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {movie.vietnameseTitle}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 italic mb-4">{movie.title}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar size={18} className="mr-2 text-red-600" />
                        <span>Ngày đặt: {formatDate(booking.bookingDate)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock size={18} className="mr-2 text-red-600" />
                        <span>Thời lượng: {movie.duration} phút</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin size={18} className="mr-2 text-red-600" />
                        <span>Phòng: {booking.showTimeId.split('_').pop()}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Ticket size={18} className="mr-2 text-red-600" />
                        <span>Số ghế: {booking.seats.length}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {booking.seats.map((seatId, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
                        >
                          {seatId.split('_')[1]}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold text-gray-900">
                        Tổng tiền: {formatPrice(booking.totalPrice)}
                      </div>
                      
                      <div className="space-x-3">
                        <button
                          onClick={() => navigate(`/movie/${movie.id}`)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Chi tiết phim
                        </button>
                        
                        {booking.status === 'confirmed' && (
                          canCancel ? (
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowCancellationConfirmation(true);
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              Hủy Vé
                            </button>
                          ) : (
                            <div className="inline-flex items-center text-yellow-600 text-sm ml-2">
                              <AlertTriangle size={16} className="mr-1" />
                              Đã quá thời gian hủy vé
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Cancellation Confirmation Modal */}
      {showCancellationConfirmation && selectedBooking && (
        <BookingCancelConfirmation
          booking={selectedBooking}
          movie={getMovie(selectedBooking.movieId)!}
          onCancel={() => setShowCancellationConfirmation(false)}
          onConfirm={handleCancelBooking}
        />
      )}
    </div>
  );
};

export default BookingHistoryPage;