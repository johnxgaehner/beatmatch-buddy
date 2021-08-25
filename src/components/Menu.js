import Navigation from "./Navigation";
import "./Menu.css";

export default function Menu({ menuIsVisible, setMenuIsVisible }) {
  function getMenuState() {
    return menuIsVisible ? "Menu--visible" : "";
  }

  function toggleMenu(event) {
    setMenuIsVisible(false);
    event.stopPropagation();
    document.body.style.overflow = "auto";
  }

  return (
    <section onClick={toggleMenu} className={`Menu ${getMenuState()}`}>
      <div className="Menu__Header">
        <h1>Menu</h1>
        <p onClick={toggleMenu}>Close</p>
      </div>
      <Navigation />
    </section>
  );
}
