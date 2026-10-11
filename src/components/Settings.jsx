import { useSettings } from "../SettingsContext";
import BottomNavigator from "./BottomNavigator";

function Settings() {
  const { unit, setUnit, theme, setTheme } = useSettings();

  return (
    <>
      <div className="settings-page">
        <div className="settings-container">
          <h2>Settings</h2>
          <p className="settings-subtitle">Customize your weather experience</p>

          {/* Setting 1: Temperature Unit Converter */}
          <div className="settings-section">
            <h3>🌡️ Temperature Unit</h3>
            <p className="section-desc">Choose your preferred temperature measurement</p>
            <div className="settings-options">
              <button
                type="button"
                className={`option-btn ${unit === "celsius" ? "active" : ""}`}
                onClick={() => setUnit("celsius")}
              >
                <span className="option-title">Celsius (°C)</span>
                <span className="option-sub">Metric</span>
              </button>

              <button
                type="button"
                className={`option-btn ${unit === "fahrenheit" ? "active" : ""}`}
                onClick={() => setUnit("fahrenheit")}
              >
                <span className="option-title">Fahrenheit (°F)</span>
                <span className="option-sub">Imperial</span>
              </button>
            </div>
          </div>

          {/* Setting 2: Theme Selector */}
          <div className="settings-section">
            <h3>🎨 Appearance & Theme</h3>
            <p className="section-desc">Select how Atmosphere Action looks on your device</p>
            <div className="settings-options theme-options">
              <button
                type="button"
                className={`option-btn ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}
              >
                <span className="option-icon">☀️</span>
                <span className="option-title">Light</span>
              </button>

              <button
                type="button"
                className={`option-btn ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
              >
                <span className="option-icon">🌙</span>
                <span className="option-title">Dark</span>
              </button>

              <button
                type="button"
                className={`option-btn ${theme === "system" ? "active" : ""}`}
                onClick={() => setTheme("system")}
              >
                <span className="option-icon">💻</span>
                <span className="option-title">System</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigator />
    </>
  );
}

export default Settings;

