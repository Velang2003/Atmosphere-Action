import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter} from 'react-router'
import { RouterProvider } from 'react-router/dom'

import './index.css'
import App from './App.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import About from './components/About.jsx'
import SavedLocations from './components/SavedLocations.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/about",
    element: <About/>
  },
  // {
  //   path: "/locations",
  //   element: <SavedLocations/>
  // },
  {
    path: "*",
    element: <PageNotFound/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
