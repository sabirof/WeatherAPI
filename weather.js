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
