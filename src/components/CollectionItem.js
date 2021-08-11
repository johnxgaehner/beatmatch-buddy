import "./CollectionItem.css";
import placeholder from "../images/artwork_placeholder.png";
import { ReactComponent as IconPlus } from "../assets/icon_plus.svg";

export default function CollectionItem({ data }) {
  return (
    <div className="CollectionItem">
      <div className="CollectionItem--left">
        <img src={placeholder} alt="artwork" />
        <div>
          <ul>
            <li>{data.trackTitle}</li>
            <li>{data.artistName}</li>
            <li>{data.recordTitle}</li>
            <li>{data.bpm}BPM</li>
          </ul>
        </div>
      </div>
      <IconPlus />
    </div>
  );
}