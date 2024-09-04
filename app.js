const apiKey = 'your_openweathermap_api_key';

function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' });
    const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    document.getElementById('datetime').textContent = `${date} | ${time}`;
}

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('API Response:', data);  // Log the full response data

        if (response.ok) {
            const cityName = data.name;
            const tempCelsius = data.main.temp;
            const tempFahrenheit = (tempCelsius * 9/5) + 32;
            const humidity = data.main.humidity;
            const timezoneOffset = data.timezone;

            const sunriseTime = new Date((data.sys.sunrise + timezoneOffset) * 1000);
            const sunsetTime = new Date((data.sys.sunset + timezoneOffset) * 1000);

            document.getElementById('cityName').textContent = `Weather in ${cityName}`;
            document.getElementById('temperature').textContent = `${tempCelsius.toFixed(1)}°C / ${tempFahrenheit.toFixed(1)}°F`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
            document.getElementById('sunset').textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;
        } else {
            alert(data.message || 'City not found!');
            clearWeatherData();
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('Error fetching weather data. Please try again later.');
        clearWeatherData();
    }
}

function clearWeatherData() {
    document.getElementById('cityName').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('sunrise').textContent = '';
    document.getElementById('sunset').textContent = '';
}

// Update the date and time every minute
setInterval(updateDateTime, 60000);
updateDateTime(); // Initial call to set the time immediately
