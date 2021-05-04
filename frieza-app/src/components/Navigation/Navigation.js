import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (<nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/freezers">Freezers</NavLink>
  </nav>);
}

export default Navigation;
