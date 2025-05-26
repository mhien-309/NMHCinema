import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import ShowTimeSelector from '../components/booking/ShowTimeSelector';
import SeatSelector from '../components/booking/SeatSelector';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import { Movie, ShowTime, Seat, Booking } from '../types';
import { generateShowTimes } from '../data/showTimeData';
import { Calendar, Clock, Film } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovie, bookTicket } = useMovies();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showTimes, setShowTimes] = useState<ShowTime[]>([]);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    if (id) {
      const movieData = getMovie(id);
      if (movieData) {
        setMovie(movieData);
        // Generate show times for this movie
        const generatedShowTimes = generateShowTimes([id]);
        setShowTimes(generatedShowTimes);
        // Update document title
        document.title = `Đặt Vé: ${movieData.vietnameseTitle} - NMH Cinema`;
      }
    }
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: `/booking/${id}` } });
    }
    
    // Cleanup
    return () => {
      document.title = 'NMH Cinema';
    };
  }, [id, getMovie, isAuthenticated, navigate]);
  
  const handleShowTimeSelect = (showTime: ShowTime) => {
    setSelectedShowTime(showTime);
    setSelectedSeats([]);
  };
  
  const handleSeatSelect = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };
  
  const handleBookingConfirm = () => {
    if (!currentUser || !movie || !selectedShowTime) return;
    
    const newBooking: Booking = {
      id: `booking_${Date.now()}`,
      userId: currentUser.id,
      movieId: movie.id,
      showTimeId: selectedShowTime.id,
      seats: selectedSeats.map(seat => seat.id),
      totalPrice: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    // Book the ticket
    bookTicket(newBooking);
    
    // Close confirmation
    setShowConfirmation(false);
    
    // Navigate to booking history
    navigate('/history', { state: { newBooking: true } });
  };

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="bg-red-50 p-8 rounded-lg text-center">
          <p className="text-red-700 text-lg mb-2">Phim không tồn tại!</p>
          <button 
            onClick={() => navigate('/')}
            className="text-red-600 hover:text-red-700 underline"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Movie Info */}
        <div className="bg-gradient-to-r from-red-800 to-red-600 text-white p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <img
              src={movie.posterUrl}
              alt={movie.vietnameseTitle}
              className="w-32 h-auto rounded shadow-lg mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{movie.vietnameseTitle}</h1>
              <p className="text-white/80 italic mb-4">{movie.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <Clock size={18} className="mr-1" />
                  <span>{movie.duration} phút</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-1" />
                  <span>
                    {new Date(movie.releaseDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Film size={18} className="mr-1" />
                  <span>{movie.genre.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Chọn Suất Chiếu</h2>
            {showTimes.length > 0 ? (
              <ShowTimeSelector 
                showTimes={showTimes} 
                onSelectShowTime={handleShowTimeSelect} 
              />
            ) : (
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-yellow-700">
                  Hiện tại không có suất chiếu nào cho phim này. Vui lòng quay lại sau.
                </p>
              </div>
            )}
          </div>
          
          {selectedShowTime && (
            <div>
              <h2 className="text-xl font-semibold mb-4">2. Chọn Ghế</h2>
              <SeatSelector 
                seats={selectedShowTime.seats} 
                onSelectSeats={handleSeatSelect} 
              />
              
              {selectedSeats.length > 0 && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowConfirmation(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
                  >
                    Tiếp Tục
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Booking Confirmation Modal */}
      {showConfirmation && movie && selectedShowTime && (
        <BookingConfirmation
          movie={movie}
          showTime={selectedShowTime}
          selectedSeats={selectedSeats}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
};

export default BookingPage;