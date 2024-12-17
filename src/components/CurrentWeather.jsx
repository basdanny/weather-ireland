import React from 'react';
import { format } from 'date-fns';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">{data.name}</h2>
        <p className="text-gray-500">{format(new Date(), 'EEEE, MMMM do')}</p>
      </div>
      
      <div className="flex justify-center items-center mb-6">
        <img 
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-32 h-32"
        />
        <div className="text-center">
          <h1 className="text-6xl font-bold">{Math.round(data.main.temp)}°C</h1>
          <p className="text-xl capitalize">{data.weather[0].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <WiThermometer className="text-3xl text-blue-500" />
          <p className="text-sm text-gray-500">Feels Like</p>
          <p className="font-semibold">{Math.round(data.main.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center">
          <WiHumidity className="text-3xl text-blue-500" />
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="text-3xl text-blue-500" />
          <p className="text-sm text-gray-500">Wind</p>
          <p className="font-semibold">{Math.round(data.wind.speed)} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;