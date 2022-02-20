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

let h3 = document.querySelector("h3");
h3.innerHTML = `${currentDay} ${currentDt} ${currentMonth} ${currentYear} ${currentHour}:${currentMinute}`;

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

  //console.log(response);
}

/*function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let head = document.querySelector("#temperature");
  head.innerHTML = `${temperature}°C`;
  console.log(temperature);
}*/

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
