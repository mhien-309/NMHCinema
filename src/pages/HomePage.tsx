import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieList from '../components/movie/MovieList';
import { Movie } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const { movies } = useMovies();
  const [activeSlide, setActiveSlide] = useState(0);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    // Select featured movies (top rated or newest)
    if (movies.length > 0) {
      const featured = [...movies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      setFeaturedMovies(featured);
    }
  }, [movies]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(current => (current + 1) % featuredMovies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredMovies.length]);
  
  const nextSlide = () => {
    setActiveSlide(current => (current + 1) % featuredMovies.length);
  };
  
  const prevSlide = () => {
    setActiveSlide(current => (current - 1 + featuredMovies.length) % featuredMovies.length);
  };

  return (
    <div>
      {/* Hero Carousel */}
      {featuredMovies.length > 0 && (
        <div className="relative overflow-hidden h-[500px] md:h-[600px]">
          {featuredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
              <img
                src={movie.posterUrl}
                alt={movie.vietnameseTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <div className="container mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {movie.vietnameseTitle}
                  </h2>
                  <p className="text-white/80 italic mb-3">{movie.title}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genre.map((genre, idx) => (
                      <span 
                        key={idx} 
                        className="inline-block bg-red-600/70 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/90 mb-6 max-w-2xl line-clamp-2 md:line-clamp-3">
                    {movie.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors inline-block"
                    >
                      Chi tiết
                    </Link>
                    <Link
                      to={`/booking/${movie.id}`}
                      className="bg-white hover:bg-gray-100 text-red-600 px-6 py-2 rounded-md transition-colors inline-block"
                    >
                      Đặt vé ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-20 left-0 right-0 z-30 flex justify-center space-x-2">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeSlide ? 'bg-red-600' : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Now Showing Movies */}
      <MovieList movies={movies} title="Phim Đang Chiếu" />
    </div>
  );
};

export default HomePage;