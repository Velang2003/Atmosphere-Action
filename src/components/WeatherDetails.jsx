import { useEffect, useState } from "react";
import {  useLocation } from "react-router";
import loading from "../assets/loading.gif";
import BottomNavigator from "./BottomNavigator"

function WeatherDetails() {

    const { state } = useLocation();
    const location = state.location;

    const [weatherData, setWeatherData] = useState(null);

    // console.log(location);

    
    useEffect(()=>{
      if(!location) return;

      const controller = new AbortController();

      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max&current=temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m,pressure_msl&timezone=auto`, {signal: controller.signal})
      .then(response => {
        if(!response.ok) throw new Error("Something went wrong...");
        return response.json();
      })
      .then(data => setWeatherData(data))
      .catch(error => console.log(error));

      return ()=>{
        controller.abort();
      }

    },[location]);

    // console.log(weatherData.daily);

    
    if(!weatherData){
      return(<>
       <div className="loadingComponent">
         <img src={loading} alt="loading GIF" />
         <p>Loading...</p>
       </div>
    </>);
  }

  const sevenDayCards = [];
  for(let i=0; i<7; i++){
    sevenDayCards.push(
      <div className="eachDayCard">
        <p className="CardDate">{weatherData.daily.time[i]}</p>
        <p>{weatherData.daily.temperature_2m_max[i]} / {weatherData.daily.temperature_2m_min[i]} {weatherData.current_units.temperature_2m}</p>
        <p>{weatherData.daily.weather_code[i]}</p>
        <p>{weatherData.daily.uv_index_max[i]}</p>
      </div>
    );
  }
  
  return (
    <>
        <div className="weatherCard">
            <div className="locationDetails">
                <h2>{location.name} {(weatherData.current.is_day === 1) ? "☀️": "🌑"}</h2>
                <p>{location.state}, {location.country}</p>
                <p className="coordinates">latitude: {location.latitude}, longitude: {location.longitude}</p>
            </div>

            <div className="weatherDetails">
                <h3>Current Weather</h3>
                <p>Temperature: {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}</p>
                <p>Relative Humidity: {weatherData.current.relative_humidity_2m} {weatherData.current_units.relative_humidity_2m}</p>
                <p>Wind Speed (10m): {weatherData.current.wind_speed_10m} {weatherData.current_units.wind_speed_10m}</p>
                <p>Rain: {weatherData.current.rain} {weatherData.current_units.rain}</p>
                <p>Pressure: {weatherData.current.pressure_msl} {weatherData.current_units.pressure_msl}</p>
            </div>

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