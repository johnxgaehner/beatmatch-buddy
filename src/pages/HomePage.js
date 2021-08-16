import { NavLink } from "react-router-dom";
import "./HomePage.css";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";

export default function HomePage() {
  return (
    <nav className="navigation">
      <NavLink className="Row--flat --space-between" to="/analyse">
        <p>Analyse</p>
        <IconArrow />
      </NavLink>
      <NavLink className="Row--flat --space-between" to="/collection">
        <p>Collection</p>
        <IconArrow />
      </NavLink>
      <NavLink className="Row--flat --space-between" to="/playlists">
        <p>Playlists</p>
        <IconArrow />
      </NavLink>
      <NavLink className="Row--flat --space-between" to="/project-info">
        <p>Project Info</p>
        <IconArrow />
      </NavLink>
    </nav>
  );
}
