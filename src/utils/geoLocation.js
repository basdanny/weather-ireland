import { searchGeoLocation } from '../utils/api';

// List of some of the Irish cities
const IRISH_CITIES = [
  { name: 'Dublin', lat: 53.3498, lon: -6.2603 },
  { name: 'Cork', lat: 51.8985, lon: -8.4756 },
  { name: 'Galway', lat: 53.2707, lon: -9.0568 },
  { name: 'Limerick', lat: 52.6638, lon: -8.6267 },
  { name: 'Waterford', lat: 52.2593, lon: -7.1128 },
  { name: 'Drogheda', lat: 53.7147, lon: -6.3511 },
  { name: 'Dundalk', lat: 54.0088, lon: -6.4023 },
  { name: 'Sligo', lat: 54.2697, lon: -8.4694 },
  { name: 'Kilkenny', lat: 52.6541, lon: -7.2448 },
  { name: 'Wexford', lat: 52.3365, lon: -6.4623 },
  { name: 'Derry', lat: 54.9966, lon: -7.3086 },
  { name: 'Armagh', lat: 54.3503, lon: -6.6528 },
  { name: 'Lisburn', lat: 54.5137, lon: -6.0363 },
  { name: 'Belfast', lat: 54.5973, lon: -5.9301 },
  { name: 'Carlow', lat: 52.8372, lon: -6.9295 },
  { name: 'Clare', lat: 52.8428, lon: -6.933 },
  { name: 'Clonmel', lat: 52.3565, lon: -7.7093 },
  { name: 'Cobh', lat: 51.854, lon: -8.3004 },
  { name: 'Ennis', lat: 52.8434, lon: -9.0007 },
  { name: 'Kells', lat: 53.7264, lon: -6.8842 },
  { name: 'Kilrush', lat: 52.6362, lon: -9.5136 },
  { name: 'Letterkenny', lat: 54.9527, lon: -7.7253 },
  { name: 'Longford', lat: 53.7255, lon: -7.7976 },
  { name: 'Midleton', lat: 51.9022, lon: -8.1564 },
  { name: 'Mullingar', lat: 53.5264, lon: -7.3429 },
  { name: 'Naas', lat: 53.2164, lon: -6.6597 },
  { name: 'Navan', lat: 53.6579, lon: -6.7044 },
  { name: 'Newbridge', lat: 53.1774, lon: -6.7954 },
  { name: 'Newcastle West', lat: 52.4583, lon: -9.035 },
  { name: 'Newport', lat: 52.7128, lon: -8.3919 },
  { name: 'New Ross', lat: 52.3963, lon: -6.933 },
  { name: 'Portarlington', lat: 53.1583, lon: -7.2121 },
  { name: 'Portlaoise', lat: 53.0472, lon: -7.2974 },
  { name: 'Shannon', lat: 52.7008, lon: -8.8798 },
  { name: 'Skibbereen', lat: 51.5539, lon: -9.2652 },
  { name: 'Thurles', lat: 52.6758, lon: -7.8112 },
  { name: 'Tipperary', lat: 52.4733, lon: -8.1564 },
  { name: 'Tralee', lat: 52.2672, lon: -9.705 },
  { name: 'Trim', lat: 53.5637, lon: -6.7895 },
  { name: 'Tullamore', lat: 53.2803, lon: -7.4939 },
  { name: 'Westport', lat: 53.7992, lon: -9.5333 },
  { name: 'Wicklow', lat: 52.9753, lon: -6.0269 },
  { name: 'Youghal', lat: 51.9503, lon: -7.8506 },
  { name: 'Bagenalstown', lat: 52.7128, lon: -6.9667 },
  { name: 'Bailieborough', lat: 53.8192, lon: -6.9747 },
  { name: 'Ballybofey', lat: 54.902, lon: -7.7789 },
  { name: 'Ballyhaunis', lat: 53.7633, lon: -8.7578 },
  { name: 'Ballyjamesduff', lat: 53.8553, lon: -7.2033 },
  { name: 'Ballymahon', lat: 53.5556, lon: -7.7444 },
  { name: 'Ballymote', lat: 54.0822, lon: -8.5231 },
  { name: 'Ballyshannon', lat: 54.4983, lon: -8.1864 },
  { name: 'Belturbet', lat: 54.1064, lon: -7.7424 },
  { name: 'Birr', lat: 53.0924, lon: -7.9039 },
  { name: 'Blarney', lat: 51.875, lon: -8.57 },
  { name: 'Boyle', lat: 53.9733, lon: -8.3014 },
  { name: 'Cahir', lat: 52.3833, lon: -7.9233 },
  { name: 'Castlebar', lat: 53.8642, lon: -9.2964 },
  { name: 'Castleblayney', lat: 54.1242, lon: -6.7375 },
  { name: 'Castlecomer', lat: 52.805, lon: -7.2083 },
  { name: 'Castleisland', lat: 52.2333, lon: -9.4667 },
  { name: 'Castlerea', lat: 53.7667, lon: -8.7833 },
  { name: 'Clara', lat: 53.3453, lon: -7.6167 },
  { name: 'Claremorris', lat: 53.7183, lon: -8.995 },
  { name: 'Clogherhead', lat: 53.8272, lon: -6.2361 },
  { name: 'Clones', lat: 54.1778, lon: -7.2286 },
  { name: 'Cootehill', lat: 54.0886, lon: -7.0717 },
  { name: 'Crossmolina', lat: 54.0353, lon: -9.125 },
  { name: 'Dingle', lat: 52.1333, lon: -10.2667 },
  { name: 'Drogheda', lat: 53.7147, lon: -6.3511 },
  { name: 'Dunboyne', lat: 53.4217, lon: -6.4736 },
  { name: 'Dungarvan', lat: 52.0864, lon: -7.6392 },
  { name: 'Dunmanway', lat: 51.7214, lon: -9.1122 },
  { name: 'Dunmore East', lat: 52.1494, lon: -6.9833 },
  { name: 'Edenderry', lat: 53.3456, lon: -7.0536 },
  { name: 'Enniscorthy', lat: 52.5017, lon: -6.5672 },
  { name: 'Fermoy', lat: 52.1383, lon: -8.2744 },
  { name: 'Fethard', lat: 52.5317, lon: -7.6967 },
  { name: 'Fivemiletown', lat: 54.3767, lon: -7.5286 },
  { name: 'Glenamaddy', lat: 53.5556, lon: -8.57 },
  { name: 'Gorey', lat: 52.6762, lon: -6.2867 },
  { name: 'Granard', lat: 53.7833, lon: -7.4964 },
  { name: 'Innishannon', lat: 51.7667, lon: -8.65 }
];

export const searchLocation = async (query) => {
  // local limited and quick search
  const normalizedQuery = query.toLowerCase().trim();
  const quickResults = IRISH_CITIES.filter(city => 
    city.name.toLowerCase().includes(normalizedQuery)
  );
  if (quickResults.length > 0) {
    return quickResults;
  }
  
  // remote fuzzy search
  const searchResults = await searchGeoLocation(query);
  return searchResults.geonames
    .map((item) => {
      const { name, lat, lng } = item;
      return { name, lat, lon: lng };
    });
};
