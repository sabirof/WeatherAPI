// Getting the current weather data from API
const apiKey = "fdfc26ec7e877ffa8987ba56f2782ae4";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const iconApiUrl = "https://openweathermap.org/img/wn/10d@2x.png";

const citybtn = document.getElementById("citybtn");
citybtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "fdfc26ec7e877ffa8987ba56f2782ae4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const iconApiUrl = "https://openweathermap.org/img/wn/10d@2x.png";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const weatherInfo = document.getElementById("weather-card");
    weatherInfo.innerHTML = `
      <h2>${data.name} Weather</h2>
      <p>Temperature: ${data.main.temp} &deg;C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Description: ${data.weather[0].description}</p>
    `;

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

// Getting the weekly forecast data from  API
//! NO GLOBAL VARIABLES
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-city");
const weeklyWeather = document.getElementById("weekly-weather");
const icons = document.getElementById("weather-icon");

searchButton.addEventListener("click", () => {
  const city = searchInput.value;
  fetchWeatherData(city);
});

async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fdfc26ec7e877ffa8987ba56f2782ae4&units=metric`
  );

  const data = await response.json();
  console.log(data);
  displayWeatherData(data);
}

function displayWeatherData(data) {
  console.log("data :>> ", data);
  console.log("data :>> ", data.list);
  const forecast = data.list;
  let count = 1;
  for (let i = 0; i < forecast.length; i += 8) {
    const day = new Date(forecast[i].dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const weather = forecast[i].weather[0].description;

    const highTemp = forecast[i].main.temp_max.toFixed(0);
    const lowTemp = forecast[i].main.temp_min.toFixed(0);
    const iconKey = forecast[i].weather[0].icon;

    //create a variable that contains an URL with a dynamic value, being the iconkey the variable element
    const iconURL = `https://openweathermap.org/img/wn/${iconKey}.png`;
    console.log(iconURL);
    document.getElementById(`icon-img${count}`).setAttribute("src", iconURL);

    console.log(`icon-img${count}`);

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
