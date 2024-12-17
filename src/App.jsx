import { useEffect } from 'react';
import { useWeatherData } from './hooks/useWeatherData';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LocationSearch from './components/LocationSearch';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const { weather, forecast, error, loading, fetchData } = useWeatherData();

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
        }
      );
    };

    getLocation();
  }, [fetchData]);

  const handleLocationSelect = (lat, lon) => {
    fetchData(lat, lon);
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <LocationSearch onLocationSelect={handleLocationSelect} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {weather && <CurrentWeather data={weather} />}
            {forecast && <Forecast data={forecast} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;