import React, { createContext, useState, useEffect, useContext } from 'react';
import { Movie, Booking } from '../types';
import { movieData } from '../data/movieData';

interface MovieContextType {
  movies: Movie[];
  comingSoonMovies: Movie[];
  getMovie: (id: string) => Movie | undefined;
  bookTicket: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  getUserBookings: () => Booking[];
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Initialize movies from mock data
    const currentDate = new Date();
    
    // Filter movies into current and coming soon
    const current = movieData.filter(movie => new Date(movie.releaseDate) <= currentDate);
    const comingSoon = movieData.filter(movie => new Date(movie.releaseDate) > currentDate);
    
    setMovies(current);
    setComingSoonMovies(comingSoon);
    
    // Initialize bookings if not exists
    if (!localStorage.getItem('nmhBookings')) {
      localStorage.setItem('nmhBookings', JSON.stringify([]));
    }
  }, []);

  const getMovie = (id: string): Movie | undefined => {
    return [...movies, ...comingSoonMovies].find(movie => movie.id === id);
  };

  const bookTicket = (booking: Booking): void => {
    // Get current bookings
    const bookings = JSON.parse(localStorage.getItem('nmhBookings') || '[]');
    
    // Add new booking
    bookings.push({
      ...booking,
      id: `booking_${Date.now()}`,
      bookingDate: new Date().toISOString()
    });
    
    // Save updated bookings
    localStorage.setItem('nmhBookings', JSON.stringify(bookings));
    
    // Update user's bookings
    const user = JSON.parse(localStorage.getItem('nmhUser') || '{}');
    if (user && user.id) {
      const users = JSON.parse(localStorage.getItem('nmhUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      
      if (userIndex !== -1) {
        if (!users[userIndex].bookings) {
          users[userIndex].bookings = [];
        }
        users[userIndex].bookings.push(booking.id);
        localStorage.setItem('nmhUsers', JSON.stringify(users));
      }
    }
  };

  const cancelBooking = (bookingId: string): void => {
    // Get current bookings
    const bookings = JSON.parse(localStorage.getItem('nmhBookings') || '[]');
    
    // Find and remove booking
    const updatedBookings = bookings.filter((booking: Booking) => booking.id !== bookingId);
    
    // Save updated bookings
    localStorage.setItem('nmhBookings', JSON.stringify(updatedBookings));
    
    // Update user's bookings
    const user = JSON.parse(localStorage.getItem('nmhUser') || '{}');
    if (user && user.id) {
      const users = JSON.parse(localStorage.getItem('nmhUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      
      if (userIndex !== -1 && users[userIndex].bookings) {
        users[userIndex].bookings = users[userIndex].bookings.filter(
          (id: string) => id !== bookingId
        );
        localStorage.setItem('nmhUsers', JSON.stringify(users));
      }
    }
  };

  const getUserBookings = (): Booking[] => {
    const user = JSON.parse(localStorage.getItem('nmhUser') || '{}');
    if (!user || !user.id) return [];
    
    const allBookings = JSON.parse(localStorage.getItem('nmhBookings') || '[]');
    return allBookings.filter((booking: Booking) => booking.userId === user.id);
  };

  return (
    <MovieContext.Provider 
      value={{ 
        movies, 
        comingSoonMovies, 
        getMovie, 
        bookTicket, 
        cancelBooking, 
        getUserBookings 
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};