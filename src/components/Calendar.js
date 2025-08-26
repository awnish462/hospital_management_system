import React from 'react';

const Calendar = ({ selectedDate, onDateChange }) => {
  // For this example, we'll just create a simple list of the next 7 days.
  const today = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Select a Date</h3>
      <div className="grid grid-cols-7 gap-2 text-center">
        {week.map((date, index) => {
          const dateString = formatDate(date);
          const isSelected = dateString === selectedDate;
          return (
            <div key={index} onClick={() => onDateChange(dateString)} className="cursor-pointer">
              <div className="text-sm text-gray-500">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div
                className={`mt-1 w-10 h-10 rounded-full mx-auto flex items-center justify-center font-semibold
                  ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
              >
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;