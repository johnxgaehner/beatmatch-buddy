import { NavLink } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <nav className="navigation">
      <NavLink className="navigation__item" to="/analyse">
        Analyse
      </NavLink>
      <NavLink className="navigation__item" to="/collection">
        Collection
      </NavLink>
      <NavLink className="navigation__item" to="/playlists">
        Playlists
      </NavLink>
      <NavLink className="navigation__item" to="/project-info">
        Project Info
      </NavLink>
    </nav>
  );
}
