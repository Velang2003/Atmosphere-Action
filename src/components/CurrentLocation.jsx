function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error("Please allow location access to use this feature."));
        } else if (error.code === error.TIMEOUT) {
          reject(new Error("Location request timed out. Please try again."));
        } else {
          reject(new Error("Unable to determine your location."));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

// Fetch coordinates and reverse geocode to get city name, state, and country
async function fetchCurrentLocationDetails() {
  const coords = await getCurrentLocation();

  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
    );

    if (!response.ok) throw new Error("Reverse geocoding failed");
    const data = await response.json();

    const cityName = data.city || data.locality || "Current Location";
    const stateName = data.principalSubdivision || "";
    const countryName = data.countryName || "";

    return {
      name: cityName,
      latitude: coords.latitude,
      longitude: coords.longitude,
      state: stateName,
      country: countryName,
      isCurrentLocation: true,
    };
  } catch (error) {
    console.warn("Reverse geocoding failed, using fallback:", error);
    return {
      name: "Current Location",
      latitude: coords.latitude,
      longitude: coords.longitude,
      state: "",
      country: "",
      isCurrentLocation: true,
    };
  }
}

export { getCurrentLocation, fetchCurrentLocationDetails };
export default getCurrentLocation;