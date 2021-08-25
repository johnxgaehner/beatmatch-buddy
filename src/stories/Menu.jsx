import React from "react";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";
import "./Menu.css";

/**
 * Primary UI component for user interaction
 */
export const Menu = ({ isToggled, ...props }) => {
  const toggled = isToggled ? "--toggled" : "";
  return (
    <section className={`Storybook-Menu ${toggled}`}>
      <section className="Storybook-Menu__Header">
        <h1>Menu</h1>
        <p className="Storybook-Menu__ToggleButton">Close</p>
      </section>
      <nav className="Storybook-Menu__Navigation">
        <div className="Storybook-Menu__NavigationItem" to="/analyse">
          <p>Analyse</p>
          <IconArrow />
        </div>
        <div className="Storybook-Menu__NavigationItem" to="/collection">
          <p>Collection</p>
          <IconArrow />
        </div>
        <div className="Storybook-Menu__NavigationItem" to="/playlists">
          <p>Playlists</p>
          <IconArrow />
        </div>
        <div className="Storybook-Menu__NavigationItem" to="/how-to-use">
          <p>How To Use</p>
          <IconArrow />
        </div>
        <div className="Storybook-Menu__NavigationItem" to="/project-info">
          <p>Project Info</p>
          <IconArrow />
        </div>
      </nav>
    </section>
  );
};
