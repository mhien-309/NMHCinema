import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { ShowTime } from '../../types';

interface ShowTimeSelectorProps {
  showTimes: ShowTime[];
  onSelectShowTime: (showTime: ShowTime) => void;
}

const ShowTimeSelector: React.FC<ShowTimeSelectorProps> = ({ showTimes, onSelectShowTime }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Group show times by date
  const dateGroups = showTimes.reduce((groups: Record<string, ShowTime[]>, showTime) => {
    if (!groups[showTime.date]) {
      groups[showTime.date] = [];
    }
    groups[showTime.date].push(showTime);
    return groups;
  }, {});
  
  // Sort dates
  const sortedDates = Object.keys(dateGroups).sort();
  
  // Auto-select the first date if none selected
  React.useEffect(() => {
    if (sortedDates.length > 0 && !selectedDate) {
      setSelectedDate(sortedDates[0]);
    }
  }, [sortedDates, selectedDate]);
  
  // Format date for display (e.g., "T2, 10/10")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const weekday = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
    return `${weekday}, ${day}/${month}`;
  };

  // Group times by hall for selected date
  const getHallGroups = () => {
    if (!selectedDate) return {};
    
    return dateGroups[selectedDate].reduce((groups: Record<string, ShowTime[]>, showTime) => {
      if (!groups[showTime.hall]) {
        groups[showTime.hall] = [];
      }
      groups[showTime.hall].push(showTime);
      return groups;
    }, {});
  };
  
  const hallGroups = getHallGroups();

  return (
    <div className="mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Calendar size={18} className="mr-2 text-red-600" />
          Chọn Ngày
        </h3>
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {sortedDates.map(dateStr => (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`px-4 py-2 rounded-full min-w-[100px] flex-shrink-0 transition-colors ${
                selectedDate === dateStr
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formatDate(dateStr)}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Clock size={18} className="mr-2 text-red-600" />
            Chọn Giờ
          </h3>
          
          {Object.entries(hallGroups).map(([hall, showTimes]) => (
            <div key={hall} className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">{hall}</h4>
              <div className="flex flex-wrap gap-3">
                {showTimes
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(showTime => (
                    <button
                      key={showTime.id}
                      onClick={() => onSelectShowTime(showTime)}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                    >
                      {showTime.time}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDate && Object.keys(hallGroups).length === 0 && (
        <div className="bg-red-50 p-4 rounded-md text-center">
          <p className="text-red-700">Không có suất chiếu nào cho ngày này.</p>
        </div>
      )}
    </div>
  );
};

export default ShowTimeSelector;