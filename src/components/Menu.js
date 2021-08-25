import { Navigation } from "./Navigation";
import "./Menu.css";

export default function Menu() {
  return (
    <section className="Menu">
      <div className="Menu_Header">
        <h1>Menu</h1>
        <p>Close</p>
      </div>
      <Navigation />
    </section>
  );
}
