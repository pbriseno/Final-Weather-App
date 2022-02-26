//Getting Current Date and Time
let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentDate.getDay()];

let currentDt = currentDate.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[currentDate.getMonth()];

let currentYear = currentDate.getFullYear();

let currentHour = currentDate.getHours();

function addZero(min) {
  if (min < 10) {
    min = "0" + min;
    return min;
  } else {
    return min;
  }
}

let currentMinute = addZero(currentDate.getMinutes());

let h2 = document.querySelector("h2");
h2.innerHTML = `${currentDay} ${currentDt} ${currentMonth} ${currentYear} ${currentHour}:${currentMinute}`;

//Function to prevent default behavior
function preDefault(event) {
  event.preventDefault();
}

//Function to show current city with geocoding

function searchCity(city) {
  let apiKey = "abd208cd7d5195517375f60fa893a1cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "abd208cd7d5195517375f60fa893a1cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
  //axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayWeatherCondition(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  //document.querySelector("#temperature").innerHTML = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  let head = document.querySelector("#temperature");
  head.innerHTML = `${temperature}°C`;
  document.querySelector("#weather").innerHTML =
    response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  celsiusTemperature = response.data.main.temp;
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
