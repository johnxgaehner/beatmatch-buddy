import "./Menu.css";
import Navigation from "./Navigation";

export default function Menu({ menuIsHidden, toggleMenu, setMenuIsHidden }) {
  function getMenuState() {
    return menuIsHidden ? "" : "Menu--isToggled";
  }

  function handleMenuToggle() {
    setMenuIsHidden(true);
  }

  return (
    <section className={`Menu ${getMenuState()}`}>
      <div className="Menu__Header">
        <h1>Menu</h1>
        <p onClick={handleMenuToggle}>Close</p>
      </div>
      <Navigation />
    </section>
  );
}
