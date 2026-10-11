# ⛅ Atmosphere Action

A modern, responsive weather tracking application built with **React 19**, **Vite**, and the **Open-Meteo API**. Search and track real-time weather metrics across multiple cities simultaneously with automatic data refreshes, persistent local storage, customizable temperature units, and theme preferences. [roadmap.sh](https://roadmap.sh/projects/weather-app). 

---

## ✨ Features

- 🔍 **Global Location Search**: Search any city or region worldwide using Open-Meteo Geocoding.
- 📍 **Auto-Detect Current Location**: One-click and auto-detection of your current location via the Geolocation API with reverse geocoding.
- 🌡️ **Real-Time Weather Metrics**: Displays live temperature, relative humidity, wind speed, pressure, and rain.
- 🔄 **Temperature Unit Switcher**: Seamlessly toggle between Celsius (°C) and Fahrenheit (°F) with instant conversion across all views.
- 🎨 **Theme Preferences**: Switch between Light, Dark, or System mode to match your OS appearance.
- 🗂️ **Multi-Location Dashboard**: Add multiple cities and view their weather cards side-by-side without overriding previous searches.
- 💾 **Local Persistence**: Automatically saves your selected cities, settings, and theme in `localStorage`.
- 🔄 **Auto-Refresh**: Automatically updates live weather conditions every 15 minutes per card.
- 📊 **Interactive Hourly Chart & 7-Day Forecast**: Visual temperature trend line chart with dynamic timezone handling and 7-day weather predictions.
- ❌ **Location Management**: Remove any saved location card with a single click.
- 📱 **Responsive UI**: Clean, mobile-friendly interface featuring intuitive bottom navigation and smooth page routing via React Router.

---

## 🛠️ Tech Stack

- **Framework / Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Styling**: Pure Modern CSS (Flexbox, Grid, Responsive Design, CSS Variables, Dark/Light Themes)
- **Weather API**: [Open-Meteo API](https://open-meteo.com/) (Free, open-source weather & geocoding data)

---

## 📁 Project Structure

```text
Atmosphere-Action/
├── public/
├── src/
│   ├── assets/              # Icons (sun, humidity, wind, navigation, setting, etc.)
│   ├── components/
│   │   ├── About.jsx        # About page & developer info
│   │   ├── BottomNavigator.jsx # Bottom navigation bar
│   │   ├── Card.jsx         # Individual weather card component
│   │   ├── CurrentLocation.jsx # Geolocation & reverse-geocoding helper
│   │   ├── PageNotFound.jsx # 404 Fallback page
│   │   ├── SavedLocations.jsx
│   │   ├── Settings.jsx     # Settings page (°C/°F toggle & theme selector)
│   │   ├── WeatherDetails.jsx # Detailed weather report of selected location
│   │   └── charts/
│   │        └── LineChart.jsx # Interactive hourly temperature chart
│   ├── App.jsx              # Main search & dashboard view
│   ├── index.css            # Global application & theme styles
│   ├── main.jsx             # Router and React root configuration
│   ├── SettingsContext.jsx  # Global settings provider (units, themes)
│   ├── useFetchData.jsx     # Custom hook for geocoding & data fetching
│   └── weatherCodes.jsx     # Weather interpretation code mappings
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or newer recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Velang2003/Atmoshphere-Action.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd Atmoshphere-Action
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal).

---

## 📦 Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the optimized production bundle.
- `npm run preview` - Previews the production build locally.
- `npm run lint` - Runs ESLint to check for code quality issues.

---

## 🌐 Data Source & Attribution

Weather and geocoding data are provided by [Open-Meteo](https://open-meteo.com/), an open-source weather API under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license. No API keys required.

---

## 🔮 Roadmap / Completed Enhancements

- ✅ 5-to-7 day extended weather forecast
- ✅ Hourly temperature breakdown & interactive charts
- ✅ Auto-detect user's current location via Geolocation API
- ✅ Temperature unit switcher (°C / °F)
- ✅ Light / Dark / System theme toggle

---

## 👨‍💻 Author

**Velan**
- **GitHub**: [@Velang2003](https://github.com/Velang2003)
- **LinkedIn**: [Velan G](https://www.linkedin.com/in/velan-g-b79a0927b/)
- **Email**: [velanthewebdeveloper@gmail.com](mailto:velanthewebdeveloper@gmail.com)

---

## 📄 License

This project is licensed under the MIT License.