import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

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
            <HomePage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
