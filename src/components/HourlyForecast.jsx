import React, { useState } from 'react';
import { isDarkTime } from '../utils/daylight';

const HourlyForecast = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto scrollbar-hide">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center min-w-[50px] flex-shrink-0">
            <span className="text-center">
              {Math.round(item.temp)}°
            </span>
            <img
              src={`https://cdn-a.metweb.ie//images/web-meteogram-small/${item.symbol}.png`}
              className={`w-8 h-8  ${isDarkTime(item.dt) ? 'grayscale' : ''}`}
              alt="weather icon"
            />
            <span className="text-center">
              {item.dt.getHours()}:00
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;