import { useState, useCallback } from 'react';
import { fetchLocationForecast } from '../utils/api';
import { transformCurrentWeather, transformForecast } from '../utils/weatherDataTransformer';

export const useWeatherData = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLocationForecast(lat, lon);
      setWeather(transformCurrentWeather(data));
      setForecast(transformForecast(data));
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
    forecast,
    error,
    loading,
    fetchData
  };
};