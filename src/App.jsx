import { useEffect, useState, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";

import logo from "./assets/logo.png";
import Card from "./components/Card";
import BottomNavigator from "./components/BottomNavigator";
import useFetchData from "./useFetchData";
import { fetchCurrentLocationDetails } from "./components/CurrentLocation";

// Helper function to check if two locations are the same (by proximity or name)
function isSameLocation(loc1, loc2) {
  if (!loc1 || !loc2) return false;

  const lat1 = parseFloat(loc1.latitude);
  const lon1 = parseFloat(loc1.longitude);
  const lat2 = parseFloat(loc2.latitude);
  const lon2 = parseFloat(loc2.longitude);

  // Proximity check (within ~15 km / 0.15 degrees)
  if (!isNaN(lat1) && !isNaN(lon1) && !isNaN(lat2) && !isNaN(lon2)) {
    const latDiff = Math.abs(lat1 - lat2);
    const lonDiff = Math.abs(lon1 - lon2);
    if (latDiff < 0.15 && lonDiff < 0.15) {
      return true;
    }
  }

  // City and country name check
  if (
    loc1.name &&
    loc2.name &&
    loc1.name.trim().toLowerCase() === loc2.name.trim().toLowerCase()
  ) {
    if (
      !loc1.country ||
      !loc2.country ||
      loc1.country.trim().toLowerCase() === loc2.country.trim().toLowerCase()
    ) {
      return true;
    }
  }

  return false;
}

function App() {
  const [location, setLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Load locations from localStorage when App starts
  const [locations, setLocations] = useState(() => {
    return JSON.parse(localStorage.getItem("locations")) || [];
  });

  // Handler to detect user's current location
  const detectCurrentLocation = useCallback(async () => {
    setIsDetectingLocation(true);
    try {
      const currentLocation = await fetchCurrentLocationDetails();
      if (!currentLocation) return;

      setLocations((prev) => {
        // Validation: If any existing searched location matches current location,
        // remove that searched duplicate and put current location in the first position
        const filtered = prev.filter(
          (loc) => !isSameLocation(loc, currentLocation) && !loc.isCurrentLocation
        );

        return [currentLocation, ...filtered];
      });
    } catch (err) {
      console.warn("Could not retrieve current location:", err.message);
    } finally {
      setIsDetectingLocation(false);
    }
  }, []);

  // Auto-detect user's current location on initial mount
  useEffect(() => {
    detectCurrentLocation();
  }, [detectCurrentLocation]);

  function searchData(event) {
    event.preventDefault();
    if (!location.trim()) return;

    setSearchLocation(location.trim().toLowerCase());
    setLocation("");
  }

  // Fetch the searched location
  const weatherResult = useFetchData(searchLocation);

  /*
    When a new location is successfully fetched:
    Validate against current location and existing locations.
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
      // 1. Identify current location if present
      const curLoc = prev.find((loc) => loc.isCurrentLocation);

      // 2. Validation: If searched location is the SAME as the current location:
      // Remove any searched duplicate, ensure current location is kept at the first position!
      if (curLoc && isSameLocation(curLoc, newLocation)) {
        const others = prev.filter(
          (loc) => !loc.isCurrentLocation && !isSameLocation(loc, newLocation)
        );
        return [curLoc, ...others];
      }

      // 3. Prevent duplicate searched locations
      const alreadyExists = prev.some((loc) => isSameLocation(loc, newLocation));
      if (alreadyExists) {
        return prev;
      }

      // 4. If current location exists, place newLocation after current location (index 1),
      // ensuring current location ALWAYS remains in the first position!
      if (curLoc) {
        const otherLocations = prev.filter((loc) => !loc.isCurrentLocation);
        return [curLoc, newLocation, ...otherLocations];
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

        {/* Search Location Form with Current Location trigger */}
        <form onSubmit={searchData}>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Search city..."
            value={location}
            required
            onChange={(event) => setLocation(event.target.value)}
          />

          <input
            type="submit"
            value="Search"
            id="search"
          />

          <button
            type="button"
            id="locate-btn"
            onClick={detectCurrentLocation}
            title={isDetectingLocation ? "Detecting location..." : "Use Current Location"}
            disabled={isDetectingLocation}
          >
            {isDetectingLocation ? "⏳" : "📍"}
          </button>
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
          <p className="empty-msg">Search a location or allow location access to get started</p>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigator />
      <Analytics/>
    </>
  );
}

export default App;