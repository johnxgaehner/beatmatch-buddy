import { Switch, Route, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="Header">
      <Switch>
        <Route path="/analyse">
          <h1>Analyse</h1>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/collection/add-to-playlist/:id">
          <h1>Add To Playlist</h1>
          <Link to="/collection">
            <p>Return</p>
          </Link>
        </Route>
        <Route path="/collection">
          <h1>Collection</h1>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/playlists">
          <h1>Playlists</h1>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/project-info">
          <h1>Project Info</h1>
          <Link to="/">
            <p>Menu</p>
          </Link>
        </Route>
        <Route path="/create-new-playlist">
          <h1>Create New Playlist</h1>
          <Link to="/playlists">
            <p>Return</p>
          </Link>
        </Route>
        <Route path="/">
          <h1>Home</h1>
        </Route>
      </Switch>
    </header>
  );
}
