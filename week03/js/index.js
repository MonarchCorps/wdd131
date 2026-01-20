// Footer - Current Year
const currentYearElement = document.getElementById('currentYear');
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;

// Footer - Last Modified Date
const lastModifiedElement = document.getElementById('lastModified');
const lastModified = document.lastModified;
lastModifiedElement.textContent = lastModified;

// Wind Chill Calculation
function calculateWindChill(temp, windSpeed) {
    // Metric formula (Celsius and km/h)
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);
}

// Get static values from the page
const temperature = parseFloat(document.getElementById('temperature').textContent);
const windSpeed = parseFloat(document.getElementById('windSpeed').textContent);
const windChillElement = document.getElementById('windChill');

// Check conditions for viable wind chill calculation
// Metric: Temperature <= 10°C and Wind speed > 4.8 km/h
if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill}°C`;
} else {
    windChillElement.textContent = 'N/A';
}
