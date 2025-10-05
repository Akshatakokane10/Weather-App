document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '1e756ab0f0286b12c80df46025cc39f2'; 
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const weatherDisplay = document.getElementById('weather-display');
    const loadingSpinner = document.getElementById('loading-spinner');
    const messageArea = document.getElementById('message-area');

    const cityNameEl = document.getElementById('city-name');
    const currentTempEl = document.getElementById('current-temp');
    const weatherIconEl = document.getElementById('weather-icon');
    const weatherConditionEl = document.getElementById('weather-condition');
    const feelsLikeEl = document.getElementById('feels-like');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');
    const pressureEl = document.getElementById('pressure');
    const forecastContainer = document.getElementById('forecast-container');


    
    function getWeatherIcon(iconCode) {
        switch (iconCode) {
            case '01d': return 'fas fa-sun'; 
            case '01n': return 'fas fa-moon'; 
            case '02d':
            case '02n': return 'fas fa-cloud-sun'; 
            case '03d':
            case '03n': return 'fas fa-cloud'; 
            case '04d':
            case '04n': return 'fas fa-cloud-meatball'; 
            case '09d':
            case '09n': return 'fas fa-cloud-showers-heavy'; 
            case '10d':
            case '10n': return 'fas fa-cloud-sun-rain'; 
            case '11d':
            case '11n': return 'fas fa-bolt'; 
            case '13d':
            case '13n': return 'fas fa-snowflake'; 
            case '50d':
            case '50n': return 'fas fa-smog'; 
            default: return 'fas fa-question-circle';
        }
    }

    function showLoading() {
        weatherDisplay.classList.add('hidden');
        messageArea.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
    }

    function hideLoading() {
        loadingSpinner.classList.add('hidden');
    }

    function showError(message) {
        hideLoading();
        weatherDisplay.classList.add('hidden');
        messageArea.textContent = message;
        messageArea.classList.remove('hidden');
    }

    function hideError() {
        messageArea.classList.add('hidden');
    }

    

    async function fetchWeatherData(city) {
        if (!city) {
            showError('Please enter a city name.');
            return;
        }

        showLoading();

        try {
           
            const currentWeatherUrl = `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;
            const currentResponse = await fetch(currentWeatherUrl);
            const currentData = await currentResponse.json();

            if (currentData.cod !== 200) {
                throw new Error(currentData.message || 'City not found.');
            }

            const lat = currentData.coord.lat;
            const lon = currentData.coord.lon;
            
            const forecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();

            if (forecastData.cod !== '200') {
                throw new Error(forecastData.message || 'Could not fetch forecast data.');
            }
            
            renderCurrentWeather(currentData);
            renderForecast(forecastData);
            
            localStorage.setItem('lastCity', city);

            hideLoading();
            hideError();
            weatherDisplay.classList.remove('hidden');

        } catch (error) {
            console.error('Weather data fetch error:', error);
            showError(`Error: ${error.message || 'Failed to fetch weather data. Check city name or API key.'}`);
        }
    }


    function renderCurrentWeather(data) {
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const condition = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        const iconCode = data.weather[0].icon;

        cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
        currentTempEl.textContent = temp;
        weatherIconEl.className = getWeatherIcon(iconCode) + ' weather-icon';
        weatherConditionEl.textContent = condition;
        feelsLikeEl.textContent = `Feels like ${feelsLike}°C`;
        humidityEl.textContent = data.main.humidity;
        windSpeedEl.textContent = (data.wind.speed * 3.6).toFixed(1);
        pressureEl.textContent = data.main.pressure;
    }

    function renderForecast(data) {
        forecastContainer.innerHTML = ''; 

        const today = new Date().toLocaleDateString('en-US');
        const dailyForecasts = {};

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateString = date.toLocaleDateString('en-US');
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            if (dateString === today) return;

            if (!dailyForecasts[dateString]) {
                dailyForecasts[dateString] = {
                    day: dayOfWeek,
                    minTemp: item.main.temp_min,
                    maxTemp: item.main.temp_max,
                    
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                };
            } else {
               
                dailyForecasts[dateString].minTemp = Math.min(dailyForecasts[dateString].minTemp, item.main.temp_min);
                dailyForecasts[dateString].maxTemp = Math.max(dailyForecasts[dateString].maxTemp, item.main.temp_max);
            }
        });

        const forecastArray = Object.values(dailyForecasts).slice(0, 5);

        forecastArray.forEach(day => {
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <p class="forecast-day">${day.day}</p>
                <i class="${getWeatherIcon(day.icon)} forecast-icon"></i>
                <p class="min-max-temp">${Math.round(day.maxTemp)}° / ${Math.round(day.minTemp)}°</p>
                <p class="forecast-condition">${day.description}</p>
            `;
            forecastContainer.appendChild(card);
        });
    }

   

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        fetchWeatherData(city);
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            fetchWeatherData(city);
        }
    });

    function initializeApp() {
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            cityInput.value = lastCity;
            fetchWeatherData(lastCity);
        } else {
            fetchWeatherData('Kyiv'); 
        }
    }

    initializeApp();
});