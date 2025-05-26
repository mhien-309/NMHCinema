import React, { useState } from 'react';
import { Seat } from '../../types';

interface SeatSelectorProps {
  seats: Seat[];
  onSelectSeats: (selectedSeats: Seat[]) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ seats, onSelectSeats }) => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  // Group seats by row
  const seatsByRow = seats.reduce((acc: Record<string, Seat[]>, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  // Sort rows
  const sortedRows = Object.keys(seatsByRow).sort();

  const handleSeatClick = (seat: Seat) => {
    if (!seat.isAvailable) return;

    setSelectedSeatIds(prev => {
      const isSelected = prev.includes(seat.id);
      const newSelectedSeats = isSelected
        ? prev.filter(id => id !== seat.id)
        : [...prev, seat.id];
      
      // Call the parent handler with the full seat objects
      const selectedSeatObjects = seats.filter(s => newSelectedSeats.includes(s.id));
      onSelectSeats(selectedSeatObjects);
      
      return newSelectedSeats;
    });
  };

  const getSeatColor = (seat: Seat) => {
    if (!seat.isAvailable) return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    if (selectedSeatIds.includes(seat.id)) return 'bg-red-600 text-white';
    
    switch (seat.type) {
      case 'standard':
        return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      case 'vip':
        return 'bg-purple-100 hover:bg-purple-200 text-purple-800';
      case 'couple':
        return 'bg-pink-100 hover:bg-pink-200 text-pink-800';
      default:
        return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Chọn Ghế</h3>
      
      <div className="mb-6">
        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-100 rounded mr-2"></div>
            <span className="text-sm">Thường - {formatPrice(100000)}</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-100 rounded mr-2"></div>
            <span className="text-sm">VIP - {formatPrice(150000)}</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-pink-100 rounded mr-2"></div>
            <span className="text-sm">Đôi - {formatPrice(200000)}</span>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
            <span className="text-sm">Đã đặt</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-600 rounded mr-2"></div>
            <span className="text-sm">Đang chọn</span>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-800 text-white text-center py-2 mb-8 rounded">
        MÀN HÌNH
      </div>
      
      <div className="flex flex-col items-center space-y-3">
        {sortedRows.map(row => (
          <div key={row} className="flex items-center">
            <div className="w-8 text-center font-bold">{row}</div>
            <div className="flex space-x-2">
              {seatsByRow[row]
                .sort((a, b) => a.number - b.number)
                .map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    disabled={!seat.isAvailable}
                    className={`w-8 h-8 flex items-center justify-center rounded ${getSeatColor(seat)}`}
                  >
                    {seat.number}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
      
      {selectedSeatIds.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 rounded-md">
          <h4 className="font-semibold text-red-800 mb-2">Ghế đã chọn:</h4>
          <div className="flex flex-wrap gap-2">
            {seats
              .filter(seat => selectedSeatIds.includes(seat.id))
              .map(seat => (
                <span key={seat.id} className="bg-red-100 text-red-800 px-2 py-1 rounded">
                  {seat.row}{seat.number} ({formatPrice(seat.price)})
                </span>
              ))}
          </div>
          <div className="mt-3 font-semibold text-red-800">
            Tổng: {formatPrice(
              seats
                .filter(seat => selectedSeatIds.includes(seat.id))
                .reduce((sum, seat) => sum + seat.price, 0)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;