import { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import useScroll from "../hooks/useScroll";
import "./Header.css";
import Menu from "./Menu";

export default function Header() {
  const history = useHistory();

  const [headerIsHidden, setHeaderIsHidden] = useState(false);
  const MIN_SCROLL = 63;
  const TIMEOUT_DELAY = 300;

  useScroll((callbackData) => {
    const { previousScrollTop, currentScrollTop } = callbackData;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MIN_SCROLL;
    setTimeout(() => {
      setHeaderIsHidden(isScrolledDown && isMinimumScrolled);
    }, TIMEOUT_DELAY);
  });

  function getHeaderClass() {
    return headerIsHidden ? "--hidden" : "";
  }

  const [menuIsHidden, setMenuIsHidden] = useState(true);

  function toggleMenu() {
    setMenuIsHidden(false);
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      <Menu
        menuIsHidden={menuIsHidden}
        setMenuIsHidden={setMenuIsHidden}
        toggleMenu={toggleMenu}
      />
      <header className={`Header ${getHeaderClass()}`}>
        <Switch>
          <Route path="/analyse">
            <h1>Analyse</h1>
            <p onClick={toggleMenu}>Menu</p>
          </Route>
          <Route path="/collection/add-to-playlist/:id">
            <h1>Add To Playlist</h1>
            <p onClick={history.goBack} className="Header__ReturnLink">
              Return
            </p>
          </Route>
          <Route path="/collection">
            <h1>Collection</h1>
            <p onClick={toggleMenu}>Menu</p>
          </Route>
          <Route path="/playlists">
            <h1>Playlists</h1>
            <p onClick={toggleMenu}>Menu</p>
          </Route>
          <Route path="/playlist/:playlistId">
            <p></p>
            <p onClick={history.goBack} className="Header__ReturnLink">
              Return
            </p>
          </Route>
          <Route path="/create-new-playlist">
            <h1>Create New Playlist</h1>
            <p onClick={history.goBack} className="Header__ReturnLink">
              Return
            </p>
          </Route>
          <Route path="/how-to-use">
            <h1>How To Use</h1>
            <p onClick={toggleMenu}>Menu</p>
          </Route>
          <Route path="/project-info">
            <h1>Project Info</h1>
            <p onClick={toggleMenu}>Menu</p>
          </Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
      </header>
    </>
  );
}
