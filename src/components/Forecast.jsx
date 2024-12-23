import React from 'react';
import { format } from 'date-fns';

const Forecast = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">10 Day Forecast</h3>
      <div className="space-y-4">
        {data.list          
          .map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="w-24">{format(new Date(item.dt), 'EEE, MMM d')}</span>
              <img
                src={`https://cdn-a.metweb.ie//images/web-meteogram-small/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-10 h-10"
              />
              <span className="w-32 text-right">
                {Math.round(item.main.temp_max)}° / {Math.round(item.main.temp_min)}°
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Forecast;