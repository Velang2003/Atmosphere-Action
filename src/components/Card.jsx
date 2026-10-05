import { useEffect, useState } from "react";
import sun from "../assets/sun.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import remove from "../assets/close.png";

function Card({ location, onRemove }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    }

    // Fetch immediately
    fetchWeather();

    // Update every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [location.latitude, location.longitude]);

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  const temperatureData =
    `${weatherData.current.temperature_2m} ${weatherData.current_units.temperature_2m}`;

  const humidityData =
    `${weatherData.current.relative_humidity_2m} ${weatherData.current_units.relative_humidity_2m}`;

  const windSpeedData =
    `${weatherData.current.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}`;

  return (
    <div className="card">

      <div className="locationName">
        <div>
          <h2>{location.name}</h2>
          <p>
            {location.state}, {location.country}
          </p>
        </div>

        <button onClick={onRemove}>
          <img
            src={remove}
            alt="Remove location"
          />
        </button>
      </div>

      <div className="details">

        <div className="temperature report">
          <img
            src={sun}
            alt="temperature icon"
          />
          <p>{temperatureData}</p>
        </div>

        <div className="Humidity report">
          <img
            src={humidity}
            alt="humidity icon"
          />
          <p>{humidityData}</p>
        </div>

        <div className="Wind report">
          <img
            src={wind}
            alt="wind icon"
          />
          <p>{windSpeedData}</p>
        </div>

      </div>

    </div>
  );
}

export default Card;