import { getWeatherIcon } from './weatherSymbols';

export const transformCurrentWeather = (xmlData) => {
  return parseWeatherXML(xmlData);
};

export const transformForecast = (xmlString) => { 
  return parseForecastXml(xmlString);
}

function parseWeatherXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  if (!xmlDoc) {
    throw new Error('Invalid weather data format');
  }
  
  // Find the first location element (assuming single location)
  const locationElement = xmlDoc.querySelectorAll('location')[0];
  const locationElement2 = xmlDoc.querySelectorAll('location')[1];
  
  if (!locationElement) {
    throw new Error('No location data found in XML');
  }

  return parseLocationPairElements(locationElement, locationElement2);
}

function parseLocationPairElements(locationElement, locationElement2) {

  const tempElement = locationElement.querySelector('temperature');
  const temp = tempElement ? parseFloat(tempElement.getAttribute('value')) : null;
  const humidityElement = locationElement.querySelector('humidity');
  const humidity = humidityElement ? parseFloat(humidityElement.getAttribute('value')) : null;
  const windSpeedElement = locationElement.querySelector('windSpeed');
  const windSpeed = windSpeedElement ? convertMpsToKmh(parseFloat(windSpeedElement.getAttribute('mps'))) : null;
  const weatherSymbolElement = locationElement2.querySelector('symbol');
  const weatherSymbol = weatherSymbolElement ? weatherSymbolElement.getAttribute('id') : 'Default';

  return {
    main: {
      temp: temp,
      feels_like: getFeelsLike(temp, humidity, windSpeed),
      humidity: humidity
    },
    weather: [{
      description: weatherSymbol.replace(/([A-Z])/g, ' $1').trim(),
      icon: getWeatherIcon(weatherSymbol) 
    }],
    wind: {
      speed: windSpeed
    }
  };
}

export const parseForecastXml = (xmlString) => {    
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  if (!xmlDoc) {
    throw new Error('Invalid weather data format');
  }
    
  const timeElements = xmlDoc.querySelectorAll('time');  

  const dailyForecastsByDay = getDailyForecastsByDay(timeElements);

  const dailyForecasts = Array.from(timeElements)
    .filter((timeElement, index) => { 
      let from = new Date(timeElement.getAttribute('from'));
      let to = new Date(timeElement.getAttribute('to'));      
      return from.getDate() != new Date().getDate() && from.getTime() == to.getTime() && from.getHours() == 12;
    })
    .map(timeElement => {
      return {
        time: new Date(timeElement.getAttribute('from')).getTime(),
        day: new Date(timeElement.getAttribute('from')).getDate(),
        data: parseLocationPairElements(timeElement.getElementsByTagName("location")[0], timeElement.nextElementSibling.getElementsByTagName("location")[0])
      }
    })
    .sort((a, b) => a.time - b.time)
    .slice(0, 10)
    .map(item => ({
      dt: item.time,
      main: {
        temp: item.data.main.temp,
        temp_min: Math.min(...dailyForecastsByDay[item.day].map(item => item.temp)),
        temp_max: Math.max(...dailyForecastsByDay[item.day].map(item => item.temp)),
      },
      weather: [{
        description: item.data.weather[0].description,
        icon: item.data.weather[0].icon
      }]
    }));

  return {
    list: dailyForecasts
  };
};

function getDailyForecastsByDay(timeElements) {
  const allDailyForecasts = Array.from(timeElements)
    .filter((timeElement, index) => {
      let from = new Date(timeElement.getAttribute('from'));
      let to = new Date(timeElement.getAttribute('to'));
      return from.getTime() == to.getTime();
    })
    .map(timeElement => {
      return {
        day: new Date(timeElement.getAttribute('from')).getDate(),
        temp: parseFloat(timeElement.querySelector('location > temperature').getAttribute('value'))
      };
    });

  const dailyForecastsByDay = Object.groupBy(allDailyForecasts, ({ day }) => day);
  return dailyForecastsByDay;
}


const convertMpsToKmh = (mps) => mps * 3.6;

function getFeelsLike(temperature, humidity, windSpeedKmh) {  
  const windChillFactor = windSpeedKmh > 4.8 ? 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeedKmh, 0.16) + 0.3965 * temperature * Math.pow(windSpeedKmh, 0.16) : temperature;
  const heatIndex = temperature >= 27 ? -8.78469475556 + 1.61139411 * temperature + 2.33854883889 * humidity - 0.14611605 * temperature * humidity - 0.012308094 * Math.pow(temperature, 2) - 0.0164248277778 * Math.pow(humidity, 2) + 0.002211732 * Math.pow(temperature, 2) * humidity + 0.00072546 * temperature * Math.pow(humidity, 2) - 0.000003582 * Math.pow(temperature, 2) * Math.pow(humidity, 2) : temperature;
  return heatIndex > temperature ? heatIndex : windChillFactor;
}