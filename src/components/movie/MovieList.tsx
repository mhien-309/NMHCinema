import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../../types';

interface MovieListProps {
  movies: Movie[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, title }) => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 relative">
          <span className="relative z-10">{title}</span>
          <span className="absolute bottom-0 left-0 h-3 bg-red-200 w-36 -z-0"></span>
        </h2>
        
        {movies.length === 0 ? (
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <p className="text-red-700">Hiện không có phim nào trong danh mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;