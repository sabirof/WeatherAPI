// Get the current weather data from API

//pt1

const apiKey = "fdfc26ec7e877ffa8987ba56f2782ae4";

// event listener for the "citybtn" button that calls the "getWeather" function when clicked
const cityBtn = document.getElementById("citybtn");
cityBtn.addEventListener("click", getWeather);

// defining the function and fetching the api data from url
async function getWeather() {
  const city = document.getElementById("city").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // Api call request and waiting for response and then transorming the file parsed into json and relevant data is brought
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //dipslaying the data on weather-card html element
    const weatherInfo = document.getElementById("weather-card");
    weatherInfo.innerHTML = `
      <h2>${data.name} Weather</h2>
      <p>Temperature: ${data.main.temp} &deg;C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Description: ${data.weather[0].description}</p>
    `;
    //displaying the img elements and appending the new icon to the icon-container
    const iconCode = data.weather[0].icon;
    const iconElement = document.createElement("img");
    iconElement.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const iconContainer = document.getElementById("icon-container");
    iconContainer.innerHTML = "";
    iconContainer.appendChild(iconElement);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
//pt2
//getting the weekly weather data and defining the DOM elements
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-city");
const weeklyWeather = document.getElementById("weekly-weather");
//event listener
searchBtn.addEventListener("click", () => {
  const city = searchInput.value;
  fetchWeatherData(city);
});
// fetching the location and current weather data for the city has been searched
async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  displayWeatherData(data);
}
//displaying the weather data and fetching the weather icons, and my for loop displays weather data using iteration for the whole day (my api data is updated every 3 hours)
function displayWeatherData(data) {
  const forecast = data.list;
  let count = 1;
  for (let i = 0; i < forecast.length; i += 8) {
    const day = new Date(forecast[i].dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const weather = forecast[i].weather[0].description;
    const highTemp = forecast[i].main.temp_max.toFixed(0);
    const lowTemp = forecast[i].main.temp_min.toFixed(0);
    const iconURL = `https://openweathermap.org/img/wn/${forecast[i].weather[0].icon}.png`;
    document.getElementById(`icon-img${count}`).setAttribute("src", iconURL);
    const row = weeklyWeather.rows[i / 8];
    row.cells[0].textContent = day;
    row.cells[1].textContent = weather;
    row.cells[2].getElementsByClassName(
      "high-temp"
    )[0].textContent = `${highTemp}°C`;
    row.cells[3].getElementsByClassName(
      "low-temp"
    )[0].textContent = `${lowTemp}°C`;
    count++;
  }
}
