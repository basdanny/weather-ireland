import { useEffect } from 'react';
import { useWeatherData } from './hooks/useWeatherData';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LocationSearch from './components/LocationSearch';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import HourlyForecast from './components/HourlyForecast';
import InstallPWA from './components/InstallPWA';

function App() {
  const { weather, hourlyForecast, forecast, error, loading, location, fetchData } = useWeatherData();

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Silently fail and let user search manually
          console.log('Failed to get current location');
        },
        { enableHighAccuracy: false }
      );
    };

    getLocation();
  }, [fetchData]);

  const handleLocationSelect = (lat, lon) => {
    fetchData(lat, lon);
  };

  const handleDateSelect = (date) => {
    console.log(`Fetching data with date: ${date}`);
    fetchData(location.lat, location.lon, date);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <LocationSearch onLocationSelect={handleLocationSelect} />
        {loading ? (
          <LoadingSpinner />
        ) : (error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            {weather && <CurrentWeather data={weather} />}
            {hourlyForecast && <HourlyForecast data={hourlyForecast} scrollToMorning={!weather && hourlyForecast} />}
            {forecast && <Forecast data={forecast} onDateSelect={handleDateSelect} />}
            {weather && <InstallPWA />}
          </>
        ))}
      </div>
    </div>
  );
}

export default App;