//using simple proxy (via cloudflare worker) to overcome the lack of proper CORS headers in the openaccess.pf.api.met.ie/metno-wdb2ts APIs
const WEATHER_API_BASE_URL = 'https://corsproxy.basdanny.workers.dev/http://openaccess.pf.api.met.ie/metno-wdb2ts/locationforecast';

export const fetchLocationForecast = async (lat, lon) => {
  try {
    const response = await fetch(`${WEATHER_API_BASE_URL}?lat=${lat}&long=${lon}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data. Error: ' + response.error);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw new Error('Failed to fetch weather data. Error: ' + error);
  }
};

const GEO_LOCATION_API_BASE_URL = 'http://api.geonames.org/searchJSON';

export const searchGeoLocation = async (query) => {
  try {
    const response = await fetch(`${GEO_LOCATION_API_BASE_URL}?q=${encodeURIComponent(query)}&fuzzy=0.5&country=IE&maxRows=10&username=streamer4vod`);
    if (!response.ok) {
      throw new Error('Failed to fetch geo location data. Error: ' + response.error);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching geo location:', error);
    throw new Error('Failed to geo location. Error: ' + error);
  }
};
