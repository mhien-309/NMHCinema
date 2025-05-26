export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional as we don't want to expose this in some contexts
  bookings?: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface Movie {
  id: string;
  title: string;
  vietnameseTitle: string;
  posterUrl: string;
  backdropUrl: string;
  description: string;
  duration: number; // in minutes
  releaseDate: string;
  endDate: string;
  genre: string[];
  director: string;
  cast: string[];
  rating: number; // out of 10
  trailerUrl?: string;
  language?: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'vip' | 'couple';
  price: number;
  isAvailable: boolean;
}

export interface ShowTime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  hall: string;
  seats: Seat[];
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showTimeId: string;
  seats: string[]; // Array of seat ids
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}