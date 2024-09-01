const apiKey = 'your_openweathermap_api_key';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);  // Log the response data to check the structure

        if (response.ok) {
            const cityName = data.name;
            const tempCelsius = data.main.temp;
            const tempFahrenheit = (tempCelsius * 9/5) + 32;
            const timezoneOffset = data.timezone;
            
            const sunriseTime = new Date((data.sys.sunrise + timezoneOffset) * 1000);
            const sunsetTime = new Date((data.sys.sunset + timezoneOffset) * 1000);

            document.getElementById('cityName').textContent = `Weather in ${cityName}`;
            document.getElementById('temperature').textContent = `Temperature: ${tempCelsius.toFixed(1)}°C / ${tempFahrenheit.toFixed(1)}°F`;
            document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime.toUTCString().slice(17, 22)}`;
            document.getElementById('sunset').textContent = `Sunset: ${sunsetTime.toUTCString().slice(17, 22)}`;
        } else {
            alert(data.message || 'City not found!');
            document.getElementById('cityName').textContent = '';
            document.getElementById('temperature').textContent = '';
            document.getElementById('sunrise').textContent = '';
            document.getElementById('sunset').textContent = '';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}
