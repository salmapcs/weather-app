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

        if (response.ok) {
            const cityName = data.name;
            const tempCelsius = data.main.temp;
            const tempFahrenheit = (tempCelsius * 9/5) + 32;
            const feelsLikeCelsius = data.main.feels_like;
            const feelsLikeFahrenheit = (feelsLikeCelsius * 9/5) + 32;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const timezoneOffset = data.timezone;
            const sunriseTime = new Date((data.sys.sunrise + timezoneOffset) * 1000);
            const sunsetTime = new Date((data.sys.sunset + timezoneOffset) * 1000);

            document.getElementById('cityName').textContent = `Weather in ${cityName}`;
            document.getElementById('temperature').textContent = `${tempCelsius.toFixed(1)}°C / ${tempFahrenheit.toFixed(1)}°F`;
            document.getElementById('description').textContent = `Condition: ${weatherDescription}`;
            document.getElementById('feelsLike').textContent = `Feels Like: ${feelsLikeCelsius.toFixed(1)}°C / ${feelsLikeFahrenheit.toFixed(1)}°F`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} m/s`;
            document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
            document.getElementById('sunset').textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;
            document.getElementById('weatherIcon').src = weatherIcon;

            // Change background based on time
            const currentTime = new Date().getHours();
            const appContainer = document.getElementById('appContainer');
            if (currentTime >= 6 && currentTime < 18) {
                appContainer.style.background = 'linear-gradient(135deg, #4f86f7, #6ad4f7)';
            } else {
                appContainer.style.background = 'linear-gradient(135deg, #1b2735, #2e4360)';
            }
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
    document.getElementById('description').textContent = '';
    document.getElementById('feelsLike').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('windSpeed').textContent = '';
    document.getElementById('sunrise').textContent = '';
    document.getElementById('sunset').textContent = '';
    document.getElementById('weatherIcon').src = '';
}

// Update the date and time every minute
setInterval(updateDateTime, 60000);
updateDateTime(); // Initial call to set the time immediately
