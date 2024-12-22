import React, { useState } from 'react';

const HourlyForecast = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto scrollbar-hide">
        {data.map((item) => (
          <div className="flex flex-col items-center min-w-[50px] flex-shrink-0">
            <span className="text-center">
              {item.temp}°
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${item.symbol}.png`}
              className="w-10 h-10"
              alt="weather icon"
            />
            <span className="text-center">
              {new Date(item.dt).getHours()}:00
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;