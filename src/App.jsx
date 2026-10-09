import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react"

import logo from "./assets/logo.png";
import Card from "./components/Card";
import BottomNavigator from "./components/BottomNavigator";
import useFetchData from "./useFetchData";

function App() {
  const [location, setLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Load locations from localStorage when App starts
  const [locations, setLocations] = useState(() => {
    return JSON.parse(localStorage.getItem("locations")) || [];
  });

  function searchData(event) {
    event.preventDefault();

    setSearchLocation(location.trim().toLowerCase());
    setLocation("");
  }

  // Fetch the searched location
  const weatherResult = useFetchData(searchLocation);

  /*
    When a new location is successfully fetched,
    add only the location information to the list.
  */
  useEffect(() => {
    if (!weatherResult) return;

    const locationData = weatherResult.locationData?.results?.[0];

    if (!locationData) return;

    const newLocation = {
      name: locationData.name,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      state: locationData.admin1,
      country: locationData.country,
    };

    setLocations((prev) => {
      // Prevent duplicate locations
      const alreadyExists = prev.some(
        (location) =>
          location.latitude === newLocation.latitude &&
          location.longitude === newLocation.longitude
      );

      if (alreadyExists) {
        return prev;
      }

      return [newLocation, ...prev];
    });
  }, [weatherResult]);

  // Store locations in localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  // Remove a location
  function removeLocation(locationToRemove) {
    setLocations((prev) =>
      prev.filter(
        (location) =>
          location.latitude !== locationToRemove.latitude ||
          location.longitude !== locationToRemove.longitude
      )
    );
  }

  return (
    <>
      {/* Header Section */}
      <header>
        <div className="top">
          <div className="app-logo">
            <img
              id="logo"
              src={logo}
              alt="app-icon"
            />

            <h3>
              Atmosphere <span className="orange">Action</span>
            </h3>
          </div>
        </div>

        {/* Search Location */}
        <form onSubmit={searchData}>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            required
            placeholder="e.g. Bengaluru"
            onChange={(event) => setLocation(event.target.value)}
          />

          <input
            type="submit"
            value="Search"
            id="search"
          />
        </form>
      </header>

      {/* Body Section */}
      <main>
        {locations.length > 0 ? (
          locations.map((location) => (
            <Card
              key={`${location.latitude}-${location.longitude}`}
              location={location}
              onRemove={() => removeLocation(location)}
            />
          ))
        ) : (
          <p className="empty-msg">Search a location to get started</p>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigator />
      <Analytics/>
    </>
  );
}

export default App;