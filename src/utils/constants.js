//using simple proxy (via cloudflare worker) to overcome the lack of proper CORS headers in the openaccess.pf.api.met.ie/metno-wdb2ts APIs
export const WEATHER_API_BASE_URL = 'https://corsproxy.basdanny.workers.dev/http://openaccess.pf.api.met.ie/metno-wdb2ts/locationforecast';

export const GEO_LOCATION_API_BASE_URL = 'https://corsproxy.basdanny.workers.dev/http://api.geonames.org/searchJSON';

export const ICON_URL_TEMPLATE = 'https://met.ie//images/web-meteogram-small/{0}.png';
