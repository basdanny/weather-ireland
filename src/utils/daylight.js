export function isDarkTime(datetime) {
    // Get the date components
    const date = new Date(datetime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    // Approximate sunrise/sunset times for Ireland based on month
    const sunriseSunsetTimes = {
        1: { sunrise: '8:40', sunset: '16:20' },  // January
        2: { sunrise: '8:00', sunset: '17:15' },  // February
        3: { sunrise: '7:00', sunset: '18:15' },  // March
        4: { sunrise: '6:00', sunset: '19:15' },  // April
        5: { sunrise: '5:15', sunset: '20:15' },  // May
        6: { sunrise: '4:55', sunset: '21:00' },  // June
        7: { sunrise: '5:15', sunset: '20:45' },  // July
        8: { sunrise: '6:00', sunset: '20:00' },  // August
        9: { sunrise: '6:45', sunset: '18:45' },  // September
        10: { sunrise: '7:30', sunset: '17:30' }, // October
        11: { sunrise: '7:30', sunset: '16:30' }, // November
        12: { sunrise: '8:30', sunset: '16:10' }  // December
    };

    // Get sunrise/sunset times for the current month
    const { sunrise, sunset } = sunriseSunsetTimes[month];
    
    // Convert sunrise/sunset strings to minutes since midnight
    const sunriseMinutes = convertTimeToMinutes(sunrise);
    const sunsetMinutes = convertTimeToMinutes(sunset);
    
    // Convert current time to minutes since midnight
    const currentMinutes = hour * 60 + minute;
    
    // It's dark if current time is before sunrise or after sunset
    return currentMinutes < sunriseMinutes || currentMinutes > sunsetMinutes;
}

// Helper function to convert time string (HH:MM) to minutes since midnight
function convertTimeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}
