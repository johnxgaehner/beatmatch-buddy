import { NavLink } from "react-router-dom";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="Navigation">
      <NavLink className="Navigation__Item" to="/analyse">
        <p>Analyse</p>
        <IconArrow />
      </NavLink>
      <NavLink className="Navigation__Item" to="/collection">
        <p>Collection</p>
        <IconArrow />
      </NavLink>
      <NavLink className="Navigation__Item" to="/playlists">
        <p>Playlists</p>
        <IconArrow />
      </NavLink>
      <NavLink className="Navigation__Item" to="/how-to-use">
        <p>How To Use</p>
        <IconArrow />
      </NavLink>
      <NavLink className="Navigation__Item" to="/project-info">
        <p>Project Info</p>
        <IconArrow />
      </NavLink>
    </nav>
  );
}
