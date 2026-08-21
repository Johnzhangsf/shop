document.addEventListener("DOMContentLoaded", function () {

    // Default city
    const cityInput = document.getElementById("cityInput");
    cityInput.value = "San Francisco";

    // Simple city → coordinates map
    const cityCoords = {
        "San Francisco": { lat: 37.7749, lon: -122.4194 },
        "New York": { lat: 40.7128, lon: -74.0060 },
        "Los Angeles": { lat: 34.0522, lon: -118.2437 },
        "Chicago": { lat: 41.8781, lon: -87.6298 },
        "Seattle": { lat: 47.6062, lon: -122.3321 }
    };

    const weatherText = {
        0: "Clear",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing Fog",
        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Heavy Drizzle",
        61: "Light Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        71: "Light Snow",
        73: "Moderate Snow",
        75: "Heavy Snow",
        95: "Thunderstorm"
    };

    const weatherIcon = {
        0: "☀️",
        1: "🌤️",
        2: "⛅",
        3: "☁️",
        45: "🌫️",
        48: "🌫️",
        51: "🌦️",
        53: "🌦️",
        55: "🌧️",
        61: "🌧️",
        63: "🌧️",
        65: "🌧️",
        71: "❄️",
        73: "❄️",
        75: "❄️",
        95: "⛈️"
    };

    document.getElementById("searchBtn").addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!cityCoords[city]) {
            document.getElementById("error").textContent = "City not supported.";
            return;
        }

        const { lat, lon } = cityCoords[city];

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            const w = data.current_weather;

            const tempF = (w.temperature * 1.8 + 32).toFixed(1);

            document.getElementById("cityName").textContent = city;
            document.getElementById("temp").textContent = tempF + " °F";
            document.getElementById("desc").textContent =
                weatherIcon[w.weathercode] + " " + weatherText[w.weathercode];

            document.getElementById("weather").style.display = "block";
            document.getElementById("error").textContent = "";
        } catch (err) {
            document.getElementById("error").textContent = "Could not fetch weather.";
        }
    });

});

    });

});


