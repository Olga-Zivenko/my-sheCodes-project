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

function showWeather(response) {
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("div.headCity").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML =response.data.weather[0].main;
  }
function showCurrentCity(event) {
  event.preventDefault();
  let typeCity = document.querySelector("#currentcity");
  let city = typeCity.value;
  let currentCity = document.querySelector("div.headCity");
  currentCity.innerHTML = city;
  let key = "2fe0053212ae691bfbd1ef61151dca30";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
   axios.get(url).then(showWeather);
  }
let newCity = document.querySelector("form");
newCity.addEventListener("submit", showCurrentCity);
//🙀 Bonus point weather for geolocation

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
