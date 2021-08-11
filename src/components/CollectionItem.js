import "./CollectionItem.css";
import placeholder from "../images/artwork_placeholder.png";
import { ReactComponent as IconPlus } from "../assets/icon_plus.svg";

export default function CollectionItem() {
  return (
    <div className="CollectionItem">
      <div className="CollectionItem--left">
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
  );
}
