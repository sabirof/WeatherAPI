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

// Get the forecast data from your API
const forecastData = [
  {
    day: "Monday",
    weatherIcon: "wi-day-sunny",
    highTemp: "85&deg;F",
    lowTemp: "68&deg;F",
  },
  {
    day: "Tuesday",
    weatherIcon: "wi-day-cloudy",
    highTemp: "78&deg;F",
    lowTemp: "60&deg;F",
  },
  {
    day: "Wednesday",
    weatherIcon: "wi-day-rain",
    highTemp: "72&deg;F",
    lowTemp: "55&deg;F",
  },
  {
    day: "Thursday",
    weatherIcon: "wi-day-snow",
    highTemp: "68&deg;F",
    lowTemp: "50&deg;F",
  },
  {
    day: "Friday",
    weatherIcon: "wi-day-cloudy-gusts",
    highTemp: "73&deg;F",
    lowTemp: "57&deg;F",
  },
  {
    day: "Saturday",
    weatherIcon: "wi-day-sleet",
    highTemp: "65&deg;F",
    lowTemp: "48&deg;F",
  },
  {
    day: "Sunday",
    weatherIcon: "wi-day-haze",
    highTemp: "70&deg;F",
    lowTemp: "52&deg;F",
  },
];

// Loop through the forecast data and create a row for each day
const forecastTable = document.getElementById("forecast-data");
forecastData.forEach((data) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${data.day}</td>
    <td><i class="wi ${data.weatherIcon}"></i></td>
    <td>${data.highTemp}</td>
    <td>${data.lowTemp}</td>
  `;
  forecastTable.appendChild(row);
});
