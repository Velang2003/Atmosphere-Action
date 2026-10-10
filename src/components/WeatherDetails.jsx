import { useEffect, useState } from "react";
import { useLocation, useSearchParams, Link } from "react-router";
import loading from "../assets/loading.gif";
import BottomNavigator from "./BottomNavigator";
import weatherCodes from "../weatherCodes";
import LineChart from "./charts/LineChart";

function WeatherDetails() {
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Resolve location from (1) Query Params, (2) Router State, (3) localStorage
  const location = (() => {
    // Check URL Query Parameters
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const name = searchParams.get("name");
    const stateName = searchParams.get("state");
    const country = searchParams.get("country");

    if (lat && lon) {
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        name: name || "Unknown Location",
        state: stateName || "",
        country: country || "",
      };
    }

    // Check Router State
    if (state?.location?.latitude && state?.location?.longitude) {
      return state.location;
    }

    // Check selectedLocation in localStorage
    try {
      const savedSelected = localStorage.getItem("selectedLocation");
      if (savedSelected) {
        const parsed = JSON.parse(savedSelected);
        if (parsed?.latitude && parsed?.longitude) return parsed;
      }

      // Check first item from saved locations list
      const savedLocations = localStorage.getItem("locations");
      if (savedLocations) {
        const list = JSON.parse(savedLocations);
        if (Array.isArray(list) && list.length > 0 && list[0]?.latitude && list[0]?.longitude) {
          return list[0];
        }
      }
    } catch (e) {
      console.error("Error reading saved locations from localStorage:", e);
    }

    return null;
  })();

  const [weatherData, setWeatherData] = useState(null);

  // Sync resolved location to URL & localStorage
  useEffect(() => {
    if (location) {
      localStorage.setItem("selectedLocation", JSON.stringify(location));

      // If URL doesn't have the params yet, sync URL without refreshing
      if (!searchParams.get("lat") || !searchParams.get("lon")) {
        setSearchParams(
          {
            lat: location.latitude.toString(),
            lon: location.longitude.toString(),
            name: location.name,
            state: location.state || "",
            country: location.country || "",
          },
          { replace: true }
        );
      }
    }
  }, [location, searchParams, setSearchParams]);

  // Fetch weather data
  useEffect(() => {
    if (!location?.latitude || !location?.longitude) return;

    const controller = new AbortController();

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max&current=temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m,pressure_msl&timezone=auto&hourly=temperature_2m`,
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong...");
        return response.json();
      })
      .then((data) => setWeatherData(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [location?.latitude, location?.longitude]);

  // Fallback if no location exists anywhere
  if (!location) {
    return (
      <>
        <div className="weatherCard" style={{ textAlign: "center", margin: "40px auto" }}>
          <div className="locationDetails">
            <h2>No Location Selected</h2>
            <p style={{ margin: "16px 0", color: "#4a5568" }}>
              Please search for a city on the home page to view weather details.
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                backgroundColor: "var(--princeton-orange)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              ← Go to Home
            </Link>
          </div>
        </div>
        <BottomNavigator />
      </>
    );
  }

  // Loading state
  if (!weatherData) {
    return (
      <>
        <div className="loadingComponent">
          <img src={loading} alt="loading GIF" />
          <p>Loading weather data...</p>
        </div>
        <BottomNavigator />
      </>
    );
  }

  // 7 Days forecast cards
  const sevenDayCards = [];
  if (weatherData?.daily?.time) {
    for (let i = 0; i < Math.min(7, weatherData.daily.time.length); i++) {
      sevenDayCards.push(
        <div className="eachDayCard" key={weatherData.daily.time[i]}>
          <p className="CardDate">{weatherData.daily.time[i]}</p>
          <p>
            {weatherData.daily.temperature_2m_max[i]} / {weatherData.daily.temperature_2m_min[i]}{" "}
            {weatherData.current_units?.temperature_2m || "°C"}
          </p>
          <p>{weatherCodes[weatherData.daily.weather_code[i]] || "Unknown Weather Code"}</p>
          <p>UV index: {weatherData.daily.uv_index_max[i]}</p>
        </div>
      );
    }
  }

  return (
    <>
      <div className="weatherCard">
        {/* Displays Location Details */}
        <div className="locationDetails">
          <h2>
            {location.name} {weatherData.current?.is_day === 1 ? "☀️" : "🌑"}
          </h2>
          <p>
            {location.state ? `${location.state}, ` : ""}{location.country}
          </p>
          <p className="coordinates">
            latitude: {location.latitude}, longitude: {location.longitude}
          </p>
        </div>

        {/* Displays General Current Weather Data */}
        <div className="weatherDetails">
          <h3>Current Weather</h3>
          <p>
            Temperature: {weatherData.current?.temperature_2m}{" "}
            {weatherData.current_units?.temperature_2m}
          </p>
          <p>
            Relative Humidity: {weatherData.current?.relative_humidity_2m}{" "}
            {weatherData.current_units?.relative_humidity_2m}
          </p>
          <p>
            Wind Speed (10m): {weatherData.current?.wind_speed_10m}{" "}
            {weatherData.current_units?.wind_speed_10m}
          </p>
          <p>
            Rain: {weatherData.current?.rain} {weatherData.current_units?.rain}
          </p>
          <p>
            Pressure: {weatherData.current?.pressure_msl}{" "}
            {weatherData.current_units?.pressure_msl}
          </p>
        </div>

        {/* Displays Hourly Temperature Graph */}
        <div className="LineChart" style={{ minHeight: "320px" }}>
          <LineChart {...weatherData} />
        </div>

        {/* Displays 7 Days of Forecast Data */}
        <section className="sevenDayContainer">
          <h3>7 - Days Forecast</h3>
          <div className="dailyCards">{sevenDayCards}</div>
        </section>
      </div>

      <BottomNavigator />
    </>
  );
}

export default WeatherDetails;