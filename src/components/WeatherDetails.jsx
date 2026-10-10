import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate, Link } from "react-router";
import loading from "../assets/loading.gif";
import BottomNavigator from "./BottomNavigator";
import weatherCodes from "../weatherCodes";
import LineChart from "./charts/LineChart";
function WeatherDetails() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // 1. Read location from URL query params or router state
  const lat = searchParams.get("lat") || state?.location?.latitude;
  const lon = searchParams.get("lon") || state?.location?.longitude;
  const name = searchParams.get("name") || state?.location?.name;
  const stateName = searchParams.get("state") || state?.location?.state;
  const country = searchParams.get("country") || state?.location?.country;
  const location = lat && lon ? {
    latitude: lat,
    longitude: lon,
    name: name || "Unknown Location",
    state: stateName || "",
    country: country || "",
  } : null;
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    // If no coordinates are present, redirect back home
    if (!location) {
      return;
    }
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
  // Fallback if accessed directly with no coordinates
  if (!location) {
    return (
      <div className="weatherCard" style={{ textAlign: "center", margin: "40px auto" }}>
        <div className="locationDetails">
          <h2>No Location Selected</h2>
          <p style={{ margin: "16px 0" }}>Please search for a city on the home page.</p>
          <Link to="/" style={{ color: "var(--princeton-orange)", fontWeight: 600 }}>
            ← Back to Home
          </Link>
        </div>
        <BottomNavigator />
      </div>
    );
  }
  if (!weatherData) {
    return (
      <>
        <div className="loadingComponent">
          <img src={loading} alt="loading GIF" />
          <p>Loading...</p>
        </div>
        <BottomNavigator />
      </>
    );
  }

  const sevenDayCards = [];
  if(weatherData !== null){
  for(let i=0; i<7; i++){
    sevenDayCards.push(
      
      <div className="eachDayCard" key={weatherData.daily.time[i]}>
        <p className="CardDate">{weatherData.daily.time[i]}</p>
        <p>{weatherData.daily.temperature_2m_max[i]} / {weatherData.daily.temperature_2m_min[i]} {weatherData.current_units.temperature_2m}</p>
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
                <h2>{location.name} {(weatherData.current.is_day === 1) ? "☀️": "🌑"}</h2>
                <p>{location.state}, {location.country}</p>
                <p className="coordinates">latitude: {location.latitude}, longitude: {location.longitude}</p>
            </div>

            {/* Displays General Current Weather Data */}

            <div className="weatherDetails">
                <h3>Current Weather</h3>
                <p>Temperature: {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}</p>
                <p>Relative Humidity: {weatherData.current.relative_humidity_2m} {weatherData.current_units.relative_humidity_2m}</p>
                <p>Wind Speed (10m): {weatherData.current.wind_speed_10m} {weatherData.current_units.wind_speed_10m}</p>
                <p>Rain: {weatherData.current.rain} {weatherData.current_units.rain}</p>
                <p>Pressure: {weatherData.current.pressure_msl} {weatherData.current_units.pressure_msl}</p>
            </div>


            {/* Displays Hourly Temperature Graph */}
            <div className="LineChart" style={{ minHeight: "320px" }}>
              <LineChart {...weatherData}/>
            </div>

            {/* Displays 7 Days of Forecast Data such as Temperature, Date, Weather Code ,UV - index */}
            <section className="sevenDayContainer">
                <h3>7 - Days Forecast</h3>
                <div className="dailyCards">
                 {sevenDayCards}           
                </div>
            </section>
        </div>

        <BottomNavigator/>
    </>
  )
}

export default WeatherDetails