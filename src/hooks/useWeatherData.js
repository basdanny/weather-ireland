import { useState, useCallback } from 'react';
import { fetchLocationForecast } from '../utils/api';
import { transformCurrentWeather, transformHourlyForecast, transformForecast } from '../utils/weatherDataTransformer';

export const useWeatherData = () => {
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  // cache api data to reduce api calls
  let dataCache = null;

  const fetchData = useCallback(async (lat, lon, date) => {
    console.log(`getting data for lat: ${lat} lon: ${lon}`);

    setLoading(true);
    setError(null);
    setLocation({ lat, lon });

    try {
      if (!dataCache || dataCache == null || dataCache.lat !== lat || dataCache.lon !== lon) {
        const data = await fetchLocationForecast(lat, lon);
        dataCache = { lat, lon, data };
        console.log('set dataCache');
      } else {
        console.log('dataCache exists');
      }
      setWeather(transformCurrentWeather(dataCache.data, date));
      setHourlyForecast(transformHourlyForecast(dataCache.data, date));
      setForecast(transformForecast(dataCache.data));
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weather,
    hourlyForecast,
    forecast,
    error,
    loading,
    location,
    fetchData
  };
};