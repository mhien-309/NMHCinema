import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { Clock, Calendar, Star, Users, Film, PlayCircle } from 'lucide-react';
import { Movie } from '../types';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovie } = useMovies();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  
  useEffect(() => {
    if (id) {
      const movieData = getMovie(id);
      if (movieData) {
        setMovie(movieData);
        // Update document title
        document.title = `${movieData.vietnameseTitle} - NMH Cinema`;
      }
    }
    
    // Cleanup
    return () => {
      document.title = 'NMH Cinema';
    };
  }, [id, getMovie]);
  
  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="bg-red-50 p-8 rounded-lg text-center">
          <p className="text-red-700 text-lg mb-2">Phim không tồn tại!</p>
          <Link to="/" className="text-red-600 hover:text-red-700 underline">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div>
      {/* Movie Hero */}
      <div className="relative h-[500px] md:h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10" />
        <img
          src={movie.backdropUrl}
          alt={movie.vietnameseTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative md:col-span-1 flex items-start">
              <div className="w-full aspect-[2/3] rounded-lg shadow-xl border-4 border-white overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.vietnameseTitle}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="md:col-span-2 text-white space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                {movie.vietnameseTitle}
              </h1>
              <p className="text-lg text-white/80 italic">{movie.title}</p>
              
              <div className="flex flex-wrap gap-2 my-3">
                {movie.genre.map((genre, idx) => (
                  <span 
                    key={idx} 
                    className="inline-block bg-red-600/70 text-white text-sm px-3 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock size={20} className="mr-2 text-red-400" />
                  <span>{movie.duration} phút</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={20} className="mr-2 text-red-400" />
                  <span>Khởi chiếu: {formatDate(movie.releaseDate)}</span>
                </div>
                <div className="flex items-center">
                  <Star size={20} className="mr-2 text-yellow-400" />
                  <span>{movie.rating.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center">
                  <Film size={20} className="mr-2 text-red-400" />
                  <span>Đạo diễn: {movie.director}</span>
                </div>
              </div>
              
              <p className="text-white/90 line-clamp-4 md:line-clamp-none">
                {movie.description}
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to={`/booking/${movie.id}`}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors inline-block"
                >
                  Đặt vé ngay
                </Link>
                {movie.trailerUrl && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="bg-white hover:bg-gray-100 text-red-600 px-6 py-3 rounded-md transition-colors inline-flex items-center"
                  >
                    <PlayCircle size={20} className="mr-2" />
                    Xem Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Nội Dung Phim</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              {movie.description}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Diễn Viên</h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {movie.cast.map((actor, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 rounded-full px-4 py-2 flex items-center"
                >
                  <Users size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-800">{actor}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-red-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4 text-red-800">Thông Tin Phim</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Tên Phim</h4>
                  <p className="text-gray-900">{movie.vietnameseTitle}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Tên Tiếng Anh</h4>
                  <p className="text-gray-900">{movie.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Thể Loại</h4>
                  <p className="text-gray-900">{movie.genre.join(', ')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Đạo Diễn</h4>
                  <p className="text-gray-900">{movie.director}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Diễn Viên</h4>
                  <p className="text-gray-900">{movie.cast.join(', ')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Thời Lượng</h4>
                  <p className="text-gray-900">{movie.duration} phút</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Khởi Chiếu</h4>
                  <p className="text-gray-900">{formatDate(movie.releaseDate)}</p>
                </div>
              </div>
            </div>
            
            <Link
              to={`/booking/${movie.id}`}
              className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-md transition-colors"
            >
              Đặt Vé Ngay
            </Link>
          </div>
        </div>
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && movie.trailerUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src={movie.trailerUrl.replace('watch?v=', 'embed/')} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;