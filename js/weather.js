	<!----------Weather---JavaScrip>

const API_KEY = "j0ABAsmsgMBkSmYiQPCJbQZORzS4yzJu";

const weatherText = {
  1000: "Clear",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  2000: "Fog",
  2100: "Light Fog",
  4000: "Rain",
  4200: "Light Rain",
  4001: "Heavy Rain",
  5000: "Snow",
  5100: "Light Snow",
  5001: "Flurries"
};

const weatherIcon = {
  1000: "☀️",
  1100: "🌤️",
  1101: "🌤️",
  1102: "☁️",
  1001: "☁️",
  2000: "🌫️",
  2100: "🌫️",
  4000: "🌧️",
  4200: "🌦️",
  4001: "🌧️",
  5000: "❄️",
  5100: "🌨️",
  5001: "🌨️"
};

document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const hourly = data.timelines.hourly[0].values;

    const tempC = hourly.temperature;
    const tempF = (tempC * 1.8 + 32).toFixed(1);

    const code = hourly.weatherCode;

    document.getElementById("cityName").textContent = city;
    document.getElementById("temp").textContent = tempF + " °F";
    document.getElementById("desc").textContent =
      weatherIcon[code] + " " + weatherText[code];

    document.getElementById("weather").style.display = "block";
  } catch (err) {
    document.getElementById("error").textContent = "Could not fetch weather.";
  }
});


