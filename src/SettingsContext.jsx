/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // 1. Temperature Unit State: 'celsius' | 'fahrenheit'
  const [unit, setUnitState] = useState(() => {
    return localStorage.getItem("weather_unit") || "celsius";
  });

  // 2. Theme State: 'light' | 'dark' | 'system'
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("app_theme") || "system";
  });

  // Change and persist temperature unit
  function setUnit(newUnit) {
    setUnitState(newUnit);
    localStorage.setItem("weather_unit", newUnit);
  }

  // Change and persist theme
  function setTheme(newTheme) {
    setThemeState(newTheme);
    localStorage.setItem("app_theme", newTheme);
  }

  // Helper to convert raw Celsius value to the selected unit
  function convertValue(celsiusValue) {
    if (celsiusValue === undefined || celsiusValue === null) return 0;
    const num = parseFloat(celsiusValue);
    if (isNaN(num)) return celsiusValue;

    if (unit === "fahrenheit") {
      return Math.round(((num * 9) / 5 + 32) * 10) / 10;
    }
    return Math.round(num * 10) / 10;
  }

  // Helper to format temperature with unit symbol
  function formatTemp(celsiusValue) {
    if (celsiusValue === undefined || celsiusValue === null) return "--";
    const val = convertValue(celsiusValue);
    return `${val} ${unit === "fahrenheit" ? "°F" : "°C"}`;
  }

  const tempUnit = unit === "fahrenheit" ? "°F" : "°C";

  // Apply Theme Effect (Light / Dark / System)
  useEffect(() => {
    function applyTheme() {
      const root = document.documentElement;
      let effectiveTheme = theme;

      if (theme === "system") {
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }

      root.setAttribute("data-theme", effectiveTheme);
    }

    applyTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme();
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        unit,
        setUnit,
        theme,
        setTheme,
        convertValue,
        formatTemp,
        tempUnit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export default SettingsContext;
