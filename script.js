const imageBgElement = document.querySelector("#image-bg");
const locationElement = document.querySelector("#location");
const dateElement = document.querySelector("#date");
const temperatureBigElement = document.querySelector("#temperature-big");
const weatherIconElement = document.querySelector("#weather-icon");
const weatherTypeElement = document.querySelector("#weather-type");
const temperatureElement = document.querySelector("#temperature");
const humidityElement = document.querySelector("#humidity");
const windDegreeElement = document.querySelector("#wind-degree");
const windSpeedElement = document.querySelector("#wind-speed");
const overlayBtnElement = document.querySelector("#overlay-btn");
const overlayLocationElement = document.querySelector("#overlay-locations");
const locationButtons = document.querySelectorAll("#overlay-locations button");
const preloaderElelemnt = document.querySelector("#preloader");

locationButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    fetchWeather(e.currentTarget.dataset.city);
    overlayBtnElement.classList.remove("open");
    overlayLocationElement.classList.remove("open");
  });
});

const weatherTypes = {
  Sunny: "clear",
  Clear: "clear",
  "Partly cloudy": "haze",
  Cloudy: "haze",
  Overcast: "cloudy",
  Overcast: "cloudy",
  "Light rain shower": "rainy",
  "Light rain": "rainy",
  "Moderate or heavy rain shower": "rainy",
  "Torrential rain shower": "rainy",
  "Heavy rain": "rainy",
  "Patchy rain nearby": "rainy",
  "Patchy light drizzle": "rainy",
  "Patchy light rain": "rainy",
  "Light drizzle": "rainy",
  "Moderate rain at times": "rainy",
  "Heavy rain at times": "rainy",
  "Moderate rain": "rainy",
  "Light freezing rain": "rainy",
  "Moderate or heavy freezing rain": "rainy",
  "Ice pellets": "rainy",
  "Light sleet showers": "rainy",
  "Moderate or heavy sleet showers": "rainy",
  "Light showers of ice pellets": "rainy",
  "Moderate or heavy showers of ice pellets": "rainy",
  "Moderate or heavy showers of ice pellets": "rainy",
  "Patchy light rain in area with thunder": "rainy",
  "Moderate or heavy rain in area with thunder": "rainy",
  "Moderate or heavy rain in area with thunder": "rainy",
  Mist: "foggy",
  Fog: "foggy",
  "Freezing fog": "foggy",
  "Moderate snow": "snowy",
  "Patchy snow nearby": "snowy",
  "Patchy light snow": "snowy",
  "Patchy moderate snow": "snowy",
  "Moderate snow": "snowy",
  "Patchy heavy snow": "snowy",
  "Heavy snow": "snowy",
  "Patchy sleet nearby": "snowy",
  "Light sleet": "snowy",
  "Light snow": "snowy",
  "Light snow showers": "snowy",
  "Moderate or heavy sleet": "snowy",
  "Moderate or heavy snow showers": "snowy",
  "Freezing drizzle": "snowy",
  "Heavy freezing drizzle": "snowy",
  "Patchy freezing drizzle nearby": "snowy",
  "Blowing snow": "snowy",
  Blizzard: "snowy",
  "Patchy light snow in area with thunder": "snowy",
  "Moderate or heavy snow in area with thunder": "snowy",
};

overlayBtnElement.addEventListener("click", () => {
  overlayBtnElement.classList.toggle("open");
  overlayLocationElement.classList.toggle("open");
});

async function fetchWeather(loc) {
  preloaderElelemnt.style.display = "flex";
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${loc}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aaeecb3ad6mshb945f5ad309a20cp1890a0jsn9ef5cd9535f8",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    imageBgElement.src = `./images/types/${
      weatherTypes[result.current.condition.text]
    }.jpg`;
    locationElement.textContent = result.location.name;
    dateElement.textContent = moment().format("dddd, MMMM D, YYYY");
    temperatureBigElement.innerHTML = `${Math.round(
      result.current.temp_c
    )}&deg;C`;
    weatherIconElement.src = result.current.condition.icon.replace(
      "64x64",
      "128x128"
    );
    weatherTypeElement.textContent = result.current.condition.text;
    temperatureElement.innerHTML = `${result.current.feelslike_c}&deg;C`;
    humidityElement.textContent = `${result.current.humidity}%`;
    windSpeedElement.textContent = `${result.current.wind_kph}kph`;
    windDegreeElement.style.transform = `rotate(${result.current.wind_degree}deg)`;
    imageBgElement.addEventListener("load", () => {
      preloaderElelemnt.style.display = "none";
    });
  } catch (error) {
    console.error(error);
  }
}
fetchWeather("Makeevka");
