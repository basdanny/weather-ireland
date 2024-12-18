//using thingproxy.freeboard.io to overcome the lack of proper CORS headers in the openaccess.pf.api.met.ie/metno-wdb2ts APIs
const BASE_URL = 'https://corsproxy.basdanny.workers.dev?target=http://openaccess.pf.api.met.ie/metno-wdb2ts/locationforecast';

export const fetchLocationForecast = async (lat, lon) => {
  try {
    const response = await fetch(`${BASE_URL}?lat=${lat}&long=${lon}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data. Error: ' + response.error);
    }
    console.log(response);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw new Error('Failed to fetch weather data. Error: ' + error);
  }
};
