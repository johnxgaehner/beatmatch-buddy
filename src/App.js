import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/analyse">Analyse</Route>
          <Route path="/collection">Collection</Route>
          <Route path="/playlists">Playlists</Route>
          <Route path="/project-info">Project Info</Route>
          <Route path="/">
            <nav>
              <NavLink to="/analyse">Analyse</NavLink>
              <NavLink to="/collection">Collection</NavLink>
              <NavLink to="/playlists">Playlists</NavLink>
              <NavLink to="/project-info">Project Info</NavLink>
            </nav>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
