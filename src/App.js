import "./App.css";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
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
