import { Link } from "react-router"

function BottomNavigator() {
  return (
     <section>
            <Link to={"/"}>  
                <div id="Home-nav">
                    <img src="/src/assets/home.png" alt="Home-icon" />
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
                    <img src="/src/assets/about.png" alt="Save-icon" />
                    <p>About</p>
                </div>
          </Link>
      </section>
  )
}

export default BottomNavigator