import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Div100vh from "react-div-100vh";
import { ToastContainer } from "react-toast";
import AnalysePage from "./pages/AnalysePage";

function App() {
  return (
    <Div100vh className="App">
      <ToastContainer delay={3000} position="bottom-center" />
      <Header />
      <main className="main">
        <Switch>
          <Route path="/analyse">
            <AnalysePage />
          </Route>
          <Route path="/collection">Collection</Route>
          <Route path="/playlists">Playlists</Route>
          <Route path="/project-info">Project Info</Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
    </Div100vh>
  );
}

export default App;
