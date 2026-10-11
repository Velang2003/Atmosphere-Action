import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter} from 'react-router'
import { RouterProvider } from 'react-router/dom'

import './index.css'
import App from './App.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import About from './components/About.jsx'
import Settings from './components/Settings.jsx'
import WeatherDetails from './components/WeatherDetails.jsx'
import { SettingsProvider } from './SettingsContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/weather",
    element: <WeatherDetails/>
  },
  {
    path: "/settings",
    element: <Settings/>
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "*",
    element: <PageNotFound/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <RouterProvider router={router}/>
    </SettingsProvider>
  </StrictMode>,
)
