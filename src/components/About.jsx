import BottomNavigator from "./BottomNavigator"

function About() {
  return (
    <>  
       <div className="about-section">
           <h3>About Atmosphere Action (v.1.1)</h3>
          <p>
            Atmosphere Action is a responsive weather application built with React.js. It allows users to search for multiple locations and view their current temperature, humidity, and wind speed in one place.
            This project was created as a hands-on learning project to explore React, API integration, custom hooks, state management, localStorage, responsive design, and dynamic data updates.
          </p>
          
          <h3>Weather Data</h3>
          <p>
              Weather data is provided by Open-Meteo, an open-source weather API that provides access to weather data from multiple national weather services.
              Weather data is used under the CC BY 4.0 licence.
              Visit <a href="https://open-meteo.com/en/docs">Open-Meteo</a>
          </p>


          <h3>Built by Velan</h3>
          <p>
            I'm a BCA graduate and aspiring Frontend / Full-Stack Developer who enjoys learning by building practical applications. Atmosphere Action is one of my projects where I explored React and real-world API integration.
          </p>

          <h3>Let's Connect</h3>
          <p>Email: <a href="mailto:velanthewebdeveloper@gmail.com">velanthewebdeveloper@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/Velang2003">Link</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/velan-g-b79a0927b/">Link</a></p>
       </div>
        <BottomNavigator/>
    </>
  )
}

export default About