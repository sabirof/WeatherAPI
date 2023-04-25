const citybtn = document.getElementById("citybtn");
citybtn.addEventListener("click", getWeather);

const iconCode2 = async (data) => {
  console.log(data.weather[0].icon);
};
// template literals https://openweathermap.org/img/wn/04d@2x.png
async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "fdfc26ec7e877ffa8987ba56f2782ae4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fdfc26ec7e877ffa8987ba56f2782ae4&units=metric`;

  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
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
      console.log("iconElement.src :>> ", iconElement.src);
      const iconContainer = document.getElementById("icon-container");
      iconContainer.innerHTML = "";
      iconContainer.appendChild(iconElement);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Getting the forecast data from  API

const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-city");

searchButton.addEventListener("click", () => {
  const city = searchInput.value;
  fetchWeatherData(city);
});
async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fdfc26ec7e877ffa8987ba56f2782ae4&units=metric`
  );
  const data = await response.json();
  displayWeatherData(data);
}
function displayWeatherData(data) {
  const forecast = data.list;
  const weeklyWeather = document.querySelector("#weekly-weather");

  for (let i = 0; i < forecast.length; i += 8) {
    const day = new Date(forecast[i].dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const weather = forecast[i].weather[0].description;
    const highTemp = forecast[i].main.temp_max.toFixed(0);
    const lowTemp = forecast[i].main.temp_min.toFixed(0);

    const row = weeklyWeather.rows[i / 8];
    row.cells[0].textContent = day;
    row.cells[1].textContent = weather;
    row.cells[2].querySelector(".high-temp").textContent = `${highTemp}°C`;
    row.cells[3].querySelector(".low-temp").textContent = `${lowTemp}°C`;
  }
}
