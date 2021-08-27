import PropTypes from "prop-types";
import Navigation from "./Navigation";
import "./Menu.css";

export default function Menu({ menuIsVisible, setMenuIsVisible }) {
  function getMenuState() {
    return menuIsVisible && "Menu--visible";
  }

  function toggleMenu(event) {
    setMenuIsVisible(false);
    event.stopPropagation();
    document.body.style.overflow = "auto";
  }

  return (
    <section onClick={toggleMenu} className={`Menu ${getMenuState()}`}>
      <Navigation />
    </section>
  );
}

Menu.propTypes = {
  menuIsVisible: PropTypes.bool.isRequired,
  setMenuIsVisible: PropTypes.func.isRequired,
};
