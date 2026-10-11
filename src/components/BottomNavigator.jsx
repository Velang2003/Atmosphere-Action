import { Link } from "react-router";
import Home from "../assets/home.png";
import About from "../assets/about.png";
import Setting from "../assets/setting.png";

function BottomNavigator() {
  return (
    <section className="bottomNavigator">
      <Link to={"/"}>
        <div id="Home-nav">
          <img src={Home} alt="Home-icon" />
          <p>Home</p>
        </div>
      </Link>

      <Link to={"/settings"}>
        <div id="Settings-nav">
          <img src={Setting} alt="Settings-icon" />
          <p>Settings</p>
        </div>
      </Link>

      <Link to={"/about"}>
        <div id="About-nav">
          <img src={About} alt="About-icon" />
          <p>About</p>
        </div>
      </Link>
    </section>
  );
}

export default BottomNavigator;