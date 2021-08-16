import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Div100vh from "react-div-100vh";
import { ToastContainer } from "react-toast";
import AnalysePage from "./pages/AnalysePage";
import CollectionPage from "./pages/CollectionPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import CreateNewPlaylistPage from "./pages/CreateNewPlaylistPage";
import AddToPlaylistPage from "./pages/AddToPlaylistPage";
import ProjectInfoPage from "./pages/ProjectInfoPage";

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
          <Route path="/collection/add-to-playlist/:id">
            <AddToPlaylistPage />
          </Route>
          <Route path="/collection">
            <CollectionPage />
          </Route>

          <Route path="/playlists">
            <PlaylistsPage />
          </Route>
          <Route path="/project-info">
            <ProjectInfoPage />
          </Route>
          <Route path="/create-new-playlist">
            <CreateNewPlaylistPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
    </Div100vh>
  );
}

export default App;
