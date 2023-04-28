const apiKey = "4c2c21eb9ed4531df35727ae1cdeb0ad";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?" +
    "units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const pattern = /n/g

async function checkWeather(city){
    const response = await fetch(apiUrl + city + '&appid=' + apiKey);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
    }
    else {
        var data = await response.json();
        getWeather(data);
    }
}

async function getWeatherByGeoPosition(lat, lon){
    var url = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat="
        + lat + "&lon=" + lon + "&appid=" + apiKey;
    const response = await fetch(url);
    var data = await response.json();
    getWeather(data);
}

function getWeather(data){
    document.querySelector(".error").style.display = "none"
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    var isNight = data.weather[0].icon.match(pattern) == 'n';

    console.log(isNight);
    if (data.weather[0].main == "Clouds") {
        if (isNight) weatherIcon.src = "images/clouds-night.png";
        else weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        if (isNight) weatherIcon.src = "images/clear-night.png";
        else weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        if (isNight) weatherIcon.src = "images/rain-night.png";
        else weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        if (isNight) weatherIcon.src = "images/drizzle-night.png";
        else weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        if (isNight) weatherIcon.src = "images/mist-night.png";
        else weatherIcon.src = "images/mist.png";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter')
        checkWeather(searchBox.value);
})

const successCallback = (position) => {
    getWeatherByGeoPosition(position.coords.latitude, position.coords.longitude)
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);