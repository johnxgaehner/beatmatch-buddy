import { Switch, Route, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="Header">
      <Switch>
        <Route path="/analyse">
          <p>Analyse</p>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/collection/add-to-playlist/:id">
          <p>Add To Playlist</p>
          <Link to="/collection">
            <p>Return</p>
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
        <Route path="/create-new-playlist">
          <p>Create New Playlist</p>
          <Link to="/playlists">
            <p>Return</p>
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
