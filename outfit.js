const apiKey = "fdfc26ec7e877ffa8987ba56f2782ae4";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fdfc26ec7e877ffa8987ba56f2782ae4&units=metric`;

function getWeatherData(city) {
  function getOutfitSuggestion(data) {
    const temperature = Math.round(data.main.temp - 273.15);
    const weatherDescription = data.weather[0].description;

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
      temperature > 10 &&
      (weatherDescription.includes("clouds") ||
        weatherDescription.includes("rain"))
    ) {
      outfit = "Wear a raincoat, t-shirt, jeans, and sneakers.";
    } else if (temperature > 0 && weatherDescription.includes("snow")) {
      outfit = "Wear a heavy jacket, sweater, pants, and boots.";
    } else {
      outfit = "Sorry, we couldn't find an outfit for these conditions.";
    }

    const outfitDiv = document.getElementById("#outfit");
    outfitDiv.innerHTML = outfit;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      getOutfitSuggestion(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

//1. add change/input event to input element (lookup the syntax)
//inside the callback of that event you should be able to CONSOLE.LONG whatever you type
//Either you create an event that works when pushing ENTER, or you add a click event to the button
//either on Enter, or on click, we call the Fetch function* witht the value of the input

//*create a fetch function that recieves the city text, and insert it in the url
//when you get the result, you call the function that checks the wheather conditions, and based on that, generates the HTML card with the suggestions
