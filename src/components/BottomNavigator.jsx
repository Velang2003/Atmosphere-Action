import { Link } from "react-router"
import Home from "../assets/home.png"
import About from "../assets/about.png"

function BottomNavigator() {
  return (
     <section>
            <Link to={"/"}>  
                <div id="Home-nav">
                    <img src={Home} alt="Home-icon" />
                    <p>Home</p>
                </div>
            </Link>
{/* 
          <Link to={"/Locations"}>
                <div id="Saved-location-nav">
                    <img src="/src/assets/toSave.png" alt="Save-icon" />
                    <p>Saved Locations</p>
                </div>
          </Link> */}

          <Link to={"/about"}>
                <div id="Saved-location-nav" >
                    <img src={About} alt="Save-icon" />
                    <p>About</p>
                </div>
          </Link>
      </section>
  )
}

export default BottomNavigator