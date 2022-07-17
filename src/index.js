let nowDate = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[nowDate.getDay()];
  let currenthour = nowDate.getHours();
  if (currenthour < 10) {
    currenthour = `0${currenthour}`;
  }
  let currentminute = nowDate.getMinutes();
  if (currentminute < 10) {
    currentminute = `0${currentminute}`;
  }
  let currentData = ` ${currentDay}, ${currenthour}:${currentminute}`;
  return currentData;
}
let DateChange = document.querySelector("#data");
DateChange.innerHTML = formatDate(nowDate);

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weatherCards");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index <6){    
      forecastHTML =
      forecastHTML +
      ` <div class="col-2">
    <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
    <img
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    width="42" />
    <div class="card-temperature">
      <span class="card-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
      <span class="card-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
  </div>
  `;}
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates)
  let apiKey = "2fe0053212ae691bfbd1ef61151dca30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function showWeather(response) {
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("div.headCity");
  cityElement.innerHTML = response.data.name;
  celsiustemperature = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML =response.data.weather[0].main;
  let iconElement = document.querySelector("#icon")
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function search(city) {
  let key = "2fe0053212ae691bfbd1ef61151dca30";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
   axios.get(url).then(showWeather);
}
function showCurrentCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#currentcity");
  search(cityInput.value)
  }
let newCity = document.querySelector("form");
newCity.addEventListener("submit", showCurrentCity);
search ("Kyiv");

function geoPosition(position) {
  let apiKey = "2fe0053212ae691bfbd1ef61151dca30";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiurl).then(showWeather);
}
function newGeoTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoPosition);
}
let newgeo = document.querySelector("#currentButton");
newgeo.addEventListener("click", newGeoTemp);






