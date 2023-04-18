const citybtn = document.getElementById("citybtn");
citybtn.addEventListener("click", getWeather);
function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "fdfc26ec7e877ffa8987ba56f2782ae4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fdfc26ec7e877ffa8987ba56f2782ae4&units=metric`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfo = document.getElementById("weather-card");
      weatherInfo.innerHTML = `
        <h2>${data.name} Weather</h2>
        <p>Temperature: ${data.main.temp} &deg;C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Description: ${data.weather[0].description}</p>
      `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
