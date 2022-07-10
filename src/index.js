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

function displayForecast() {
  let forecastElement = document.querySelector("#weatherCards");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
    <h5 class="card-title">${day}</h5>
    <img
    src="http://openweathermap.org/img/wn/50d@2x.png"
    alt=""
    width="42" />
    <div class="card-temperature">
      <span class="card-temperature-max">18°</span>
      <span class="card-temperature-min">8°</span>
    </div>
  </div>
  `;
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
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
displayForecast();

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

function showcelsiusTemp(event){
  event.preventDefault();
  contactC.classList.add("active");
  contactF.classList.remove("active");
  let currentTemperatureC =document.querySelector("#temperature");
currentTemperatureC.innerHTML = Math.round(celsiustemperature);
}

function showFarTemp(event){
  event.preventDefault();
  contactC.classList.remove("active");
  contactF.classList.add("active");
  let currentTemperatureF =document.querySelector("#temperature");
 currentTemperatureF.innerHTML = Math.round((celsiustemperature*9)/5+32);
}

let celsiustemperature=null;


let contactC=document.querySelector("#celcius-link");
contactC.addEventListener("click",showcelsiusTemp);

let contactF =document.querySelector("#fahrenheit-link");
contactF.addEventListener("click",showFarTemp);