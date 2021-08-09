import { Switch, Route, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Switch>
        <Route path="/analyse">
          <p>Analyse</p>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/collection">
          <p>Collection</p>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/playlists">
          <p>Playlists</p>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/project-info">
          <p>Project Info</p>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/">
          <p>Home</p>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
