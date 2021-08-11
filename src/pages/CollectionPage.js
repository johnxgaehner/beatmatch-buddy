import "./CollectionPage.css";
import placeholder from "../images/artwork_placeholder.png";
import { ReactComponent as IconPlus } from "../assets/icon_plus.svg";

export default function CollectionPage() {
  return (
    <section className="CollectionPage">
      <div className="CollectionPage__SearchFilter">
        <input
          type="text"
          name="SearchFilter"
          id="SearchFilter"
          placeholder="SEARCH:"
        />
      </div>
      <div className="CollectionPage__TempoFilter">
        <p>TEMPO:</p>
        <div className="CollectionPage__TempoFilterSection">
          <input
            type="text"
            name="TempoFilter__min"
            id="TempoFilter__min"
            placeholder="128"
          />
          <p>-</p>
          <input
            type="text"
            name="TempoFilter__max"
            id="TempoFilter__max"
            placeholder="132"
          />
        </div>
      </div>
      <div className="CollectionPage__CollectionItem">
        <div className="CollectionPage__CollectionItem--left">
          <img src={placeholder} alt="artwork" />
          <div>
            <ul>
              <li>SMUDGE</li>
              <li>EDEN BURNS</li>
              <li>BIG BEAT MANIFESTO</li>
              <li>130BPM</li>
            </ul>
          </div>
        </div>
        <IconPlus />
      </div>
    </section>
  );
}
