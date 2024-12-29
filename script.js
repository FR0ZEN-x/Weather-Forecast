let unit = 'metric';

function setUnit(selectedUnit) {
    unit = selectedUnit;
    const city = document.getElementById('city').value;
    if (city) {
        getWeather();
    }
}

function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'e798c05859a474dad59d0098242a4bce';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            displayError('Error fetching the weather data');
        });
}

function displayWeather(data) {
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temperatureUnit = unit === 'metric' ? '°C' : '°F';
    const weatherInfo = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}${temperatureUnit}</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="${weatherIcon}" alt="Weather icon">
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}</p>
    `;
    const resultDiv = document.getElementById('weather-display');
    resultDiv.innerHTML = weatherInfo;
}

function displayError(message) {
    const resultDiv = document.getElementById('weather-display');
    resultDiv.innerHTML = `<p>${message}</p>`;
}