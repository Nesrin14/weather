var searchBox = document.querySelector('.searchInput');
var searchBtn = document.querySelector('.searchbtn');
var forecastIconDayone = document.querySelector("forecast-icon-dayone");
async function getWeatherData(country) {
    var weathercondition = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8f2c8dfc9c634a4da61204128232612&days=7&q=${country}`);
    return weathercondition.json();
}

function displayTodayForecast(response) {
    document.querySelector('.location').innerHTML = response.location.name;
    document.querySelector('.date').innerHTML = response.location.localtime;
    document.querySelector(".temp").innerHTML = Math.round(response.current.temp_c);
    document.querySelector(".text").innerHTML = response.current.condition.text;
    document.querySelector('.humidity-text').innerHTML = response.current.humidity;
    document.querySelector('.windspeed-text').innerHTML = response.current.wind_kph + 'km/h';
    document.querySelector('.wind-direction-text').innerHTML = response.current.wind_dir;

}

function displayTomorrowForecast(response) {
    document.querySelector('.second-day-temp').innerHTML = Math.round(response.forecast.forecastday[1].hour[0].temp_c) + "<sup>o</sup>C";
    document.querySelector('.temp-f').innerHTML = response.forecast.forecastday[1].hour[0].temp_f + "<sup>o</sup>";
    document.querySelector('.daytwo').innerHTML = response.forecast.forecastday[1].date;
    document.querySelector('.text-two').innerHTML = response.forecast.forecastday[1].day.condition.text;
}


function displayAfterTomorrowForecast(response) {
    document.querySelector('.third-day-temp').innerHTML = Math.round(response.forecast.forecastday[2].hour[0].temp_c) + "<sup>o</sup>C";
    document.querySelector('.temp-f-three').innerHTML = Math.round(response.forecast.forecastday[2].hour[0].temp_f) + "<sup>o</sup>";
    document.querySelector('.daythree').innerHTML = response.forecast.forecastday[2].date;
    document.querySelector('.text-two').innerHTML = response.forecast.forecastday[2].day.condition.text;
}

async function checkweather(country) {
    var response = await getWeatherData(country);
    console.log(response);

    displayTodayForecast(response);
    displayTomorrowForecast(response);
    displayAfterTomorrowForecast(response);
   
}

searchBox.addEventListener('keyup', function() {
    checkweather(searchBox.value);
});
