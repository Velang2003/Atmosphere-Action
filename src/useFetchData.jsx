import { useEffect, useState } from "react";

function useFetchData(place) {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (!place) {
      setResultData(null);
      return;
    }

    const controller = new AbortController();

    async function fetchData() {
      try {
        // 1. Get location
        const locationResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            place
          )}&count=10&language=en&format=json`,
          {
            signal: controller.signal,
          }
        );

        const locationData = await locationResponse.json();

        const latitude = locationData.results?.[0]?.latitude;
        const longitude = locationData.results?.[0]?.longitude;

        if (latitude === undefined || longitude === undefined) {
          setResultData(null);
          return;
        }

        // 2. Get weather using coordinates
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`,
          {
            signal: controller.signal,
          }
        );

        const weatherData = await weatherResponse.json();

        // 3. Only now consider the search complete
        setResultData({
          locationData,
          weatherData,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [place]);

  return resultData;
}

export default useFetchData;