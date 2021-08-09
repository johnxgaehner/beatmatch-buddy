import "./App.css";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
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
      <main>
        <nav>
          <ul>
            <li>Analyse</li>
            <li>Collection</li>
            <li>Playlists</li>
            <li>Project Info</li>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default App;
