// Function to get weather data from API
function getWeatherData(city) {
  const apiKey = "fdfc26ec7e877ffa8987ba56f2782ae4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fdfc26ec7e877ffa8987ba56f2782ae4&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const temperature = Math.round(data.main.temp - 273.15);
      const weatherDescription = data.weather[0].description;

      // Call function to suggest what to wear based on weather
      suggestOutfit(temperature, weatherDescription);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to suggest what to wear based on weather data
function suggestOutfit(temperature, weatherDescription) {
  let outfit = "";

  if (temperature > 25 && weatherDescription.includes("clear")) {
    outfit = "Wear a t-shirt, shorts, and sandals.";
  } else if (temperature > 20 && weatherDescription.includes("clear")) {
    outfit = "Wear a t-shirt, shorts, and sneakers.";
  } else if (
    temperature > 15 &&
    (weatherDescription.includes("clear") ||
      weatherDescription.includes("clouds"))
  ) {
    outfit = "Wear a light jacket, t-shirt, jeans, and sneakers.";
  } else if (
    (temperature > 10 && weatherDescription.includes("clouds")) ||
    weatherDescription.includes("rain")
  ) {
    outfit = "Wear a raincoat, t-shirt, jeans, and sneakers.";
  } else if (temperature > 0 && weatherDescription.includes("snow")) {
    outfit = "Wear a heavy jacket, sweater, pants, and boots.";
  } else {
    outfit = "Sorry, we couldn't find an outfit for these conditions.";
  }

  // Display the suggested outfit on the page
  const outfitDiv = document.querySelector("#outfit");
  outfitDiv.innerHTML = outfit;
}
