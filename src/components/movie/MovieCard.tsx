import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Star } from 'lucide-react';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img 
          src={movie.posterUrl} 
          alt={movie.vietnameseTitle} 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <Link 
            to={`/movie/${movie.id}`}
            className="bg-red-600 text-white text-center py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Chi Tiết
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {movie.vietnameseTitle}
        </h3>
        <p className="text-sm text-gray-600 italic mb-2">{movie.title}</p>
        
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-700">
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-red-600" />
            <span>{movie.duration} phút</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="mr-1 text-yellow-500" />
            <span>{movie.rating.toFixed(1)}/10</span>
          </div>
        </div>
        
        <div className="flex items-center mt-2 text-sm text-gray-700">
          <Calendar size={16} className="mr-1 text-red-600" />
          <span>
            {new Date(movie.releaseDate).toLocaleDateString('vi-VN')}
          </span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {movie.genre.slice(0, 3).map((genre, index) => (
            <span 
              key={index}
              className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;