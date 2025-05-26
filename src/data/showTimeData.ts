import { ShowTime, Seat } from '../types';

// Helper function to generate seats
const generateSeats = (hall: string): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  rows.forEach(row => {
    for (let i = 1; i <= 10; i++) {
      // Define seat type and price based on row
      let type: 'standard' | 'vip' | 'couple' = 'standard';
      let price = 100000; // Default price in VND
      
      if (['A', 'B'].includes(row)) {
        type = 'standard';
        price = 100000;
      } else if (['C', 'D', 'E'].includes(row)) {
        type = 'vip';
        price = 150000;
      } else if (['F', 'G', 'H'].includes(row)) {
        type = 'couple';
        price = 200000;
      }
      
      seats.push({
        id: `${hall}_${row}${i}`,
        row,
        number: i,
        type,
        price,
        isAvailable: Math.random() > 0.3 // Randomly make some seats unavailable
      });
    }
  });
  
  return seats;
};

// Generate show times for each movie
export const generateShowTimes = (movieIds: string[]): ShowTime[] => {
  const showTimes: ShowTime[] = [];
  const halls = ['Hall A', 'Hall B', 'Hall C'];
  const times = ['10:00', '13:00', '16:00', '19:00', '22:00'];
  
  // Generate show times for the next 7 days
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    movieIds.forEach(movieId => {
      halls.forEach(hall => {
        // Not all movies show in all halls or at all times
        const availableTimes = times.filter(() => Math.random() > 0.3);
        
        availableTimes.forEach(time => {
          showTimes.push({
            id: `${movieId}_${dateStr}_${time}_${hall}`.replace(/\s+/g, ''),
            movieId,
            date: dateStr,
            time,
            hall,
            seats: generateSeats(hall)
          });
        });
      });
    });
  }
  
  return showTimes;
};

// Initialize with mock data
export const showTimeData: ShowTime[] = [];