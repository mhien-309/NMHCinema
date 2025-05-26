import React, { useEffect } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieList from '../components/movie/MovieList';

const ComingSoonPage: React.FC = () => {
  const { comingSoonMovies } = useMovies();
  
  useEffect(() => {
    // Update document title
    document.title = 'Phim Sắp Chiếu - NMH Cinema';
    
    // Cleanup
    return () => {
      document.title = 'NMH Cinema';
    };
  }, []);

  return (
    <div>
      <div className="bg-red-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Phim Sắp Chiếu</h1>
          <p className="max-w-2xl mx-auto text-red-100">
            Khám phá những bộ phim hấp dẫn sắp ra mắt tại NMH Cinema. Đặt vé trước để không bỏ lỡ những tác phẩm điện ảnh đáng mong đợi nhất.
          </p>
        </div>
      </div>
      
      <MovieList movies={comingSoonMovies} title="Phim Sắp Chiếu" />
    </div>
  );
};

export default ComingSoonPage;