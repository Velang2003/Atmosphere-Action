# ⛅ Atmosphere Action

A modern, responsive weather tracking application built with **React 19**, **Vite**, and the **Open-Meteo API**. Search and track real-time weather metrics across multiple cities simultaneously with automatic data refreshes and persistent local storage. [roadmap.sh](https://roadmap.sh/projects/weather-app). 

---

## ✨ Features

- 🔍 **Global Location Search**: Search any city or region worldwide using Open-Meteo Geocoding.
- 🌡️ **Real-Time Weather Metrics**: Displays live temperature, relative humidity, and wind speed with exact measurement units.
- 🗂️ **Multi-Location Dashboard**: Add multiple cities and view their weather cards side-by-side without overriding previous searches.
- 💾 **Local Persistence**: Automatically saves your selected cities in `localStorage` so your dashboard is preserved across page reloads.
- 🔄 **Auto-Refresh**: Automatically updates live weather conditions every 15 minutes per card.
- ❌ **Location Management**: Remove any saved location card with a single click.
- 📱 **Responsive UI**: Clean, mobile-friendly interface featuring intuitive bottom navigation and smooth page routing via React Router.

---

## 🛠️ Tech Stack

- **Framework / Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: Pure Modern CSS (Flexbox, Grid, Responsive Design)
- **Weather API**: [Open-Meteo API](https://open-meteo.com/) (Free, open-source weather & geocoding data)

---

## 📁 Project Structure

```text
Atmosphere-Action/
├── public/
├── src/
│   ├── assets/              # Icons (sun, humidity, wind, navigation, etc.)
│   ├── components/
│   │   ├── About.jsx        # About page & developer info
│   │   ├── BottomNavigator.jsx # Bottom navigation bar
│   │   ├── Card.jsx         # Individual weather card component
│   │   ├── PageNotFound.jsx # 404 Fallback page
│   │   └── SavedLocations.jsx
│   ├── App.jsx              # Main search & dashboard view
│   ├── index.css            # Global application styles
│   ├── main.jsx             # Router and React root configuration
│   └── useFetchData.jsx     # Custom hook for geocoding & data fetching
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

## 🔮 Future Improvements

- ✅ 5-to-7 day extended weather forecast
- [ ] Hourly temperature breakdown & interactive charts
- [ ] Auto-detect user's current location via Geolocation API
- [ ] Temperature unit switcher (°C / °F)
- [ ] Light / Dark theme toggle

---

## 👨‍💻 Author

**Velan**
- **GitHub**: [@Velang2003](https://github.com/Velang2003)
- **LinkedIn**: [Velan G](https://www.linkedin.com/in/velan-g-b79a0927b/)
- **Email**: [velanthewebdeveloper@gmail.com](mailto:velanthewebdeveloper@gmail.com)

---

## 📄 License

This project is licensed under the MIT License.
```
