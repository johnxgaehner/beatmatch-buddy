import { useState, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import useScroll from "../hooks/useScroll";
import useOutsideClick from "../hooks/useOutsideClick";
import Menu from "./Menu";
import "./Header.css";

export default function Header() {
  const history = useHistory();

  const menuRef = useRef();
  const [menuIsVisible, setMenuIsVisible] = useOutsideClick(menuRef, false);

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

  function getHeaderState() {
    return headerIsHidden && "Header--hidden";
  }

  function toggleMenu() {
    setMenuIsVisible(!menuIsVisible);
    menuIsVisible
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  }

  return (
    <>
      <div ref={menuRef}>
        <Menu
          menuIsVisible={menuIsVisible}
          setMenuIsVisible={setMenuIsVisible}
          toggleMenu={toggleMenu}
        />
      </div>
      <header className={`Header ${getHeaderState()}`}>
        <Switch>
          <Route path="/analyse">
            <h1 className="Header__PageTitle">Analyse</h1>
            <p onClick={toggleMenu} className="Header__Link">
              {menuIsVisible ? "Close" : "Menu"}
            </p>
          </Route>
          <Route path="/collection/add-to-playlist/:id">
            <h1 className="Header__PageTitle">Add To Playlist</h1>
            <p onClick={history.goBack} className="Header__Link">
              Return
            </p>
          </Route>
          <Route path="/collection">
            <h1 className="Header__PageTitle">Collection</h1>
            <p onClick={toggleMenu} className="Header__Link">
              {menuIsVisible ? "Close" : "Menu"}
            </p>
          </Route>
          <Route path="/playlists">
            <h1 className="Header__PageTitle">Playlists</h1>
            <p onClick={toggleMenu} className="Header__Link">
              {menuIsVisible ? "Close" : "Menu"}
            </p>
          </Route>
          <Route path="/playlist/:playlistId">
            <p></p>
            <p onClick={history.goBack} className="Header__Link">
              Return
            </p>
          </Route>
          <Route path="/create-new-playlist">
            <h1 className="Header__PageTitle">Create New Playlist</h1>
            <p onClick={history.goBack} className="Header__Link">
              {menuIsVisible ? "Close" : "Menu"}
            </p>
          </Route>
          <Route path="/how-to-use">
            <h1 className="Header__PageTitle">How To Use</h1>
            <p onClick={toggleMenu} className="Header__Link">
              {menuIsVisible ? "Close" : "Menu"}
            </p>
          </Route>
          <Route path="/project-info">
            <h1 className="Header__PageTitle">Project Info</h1>
            <p onClick={toggleMenu} className="Header__Link">
              {menuIsVisible ? "Close" : "Menu"}
            </p>
          </Route>
          <Route path="/">
            <h1 className="Header__PageTitle">Home</h1>
          </Route>
        </Switch>
      </header>
    </>
  );
}
