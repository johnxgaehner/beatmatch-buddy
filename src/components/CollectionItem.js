import "./CollectionItem.css";
import { ReactComponent as IconPlusCircle } from "../assets/icon_plus_circle_filled.svg";
import { ReactComponent as RecordPlaceholder } from "../assets/record_placeholder.svg";
import { Link } from "react-router-dom";

export default function CollectionItem({ data }) {
  return (
    <div className="CollectionItem">
      <div className="CollectionItem--left">
        <RecordPlaceholder className="CollectionItem__RecordPlaceholder" />
        <div>
          <ul>
            <li>{data.trackTitle}</li>
            <li>{data.artistName}</li>
            <li>{data.recordTitle}</li>
            <li>{data.bpm}BPM</li>
          </ul>
        </div>
      </div>
      <Link to={`/collection/add-to-playlist/${data.id}`}>
        <IconPlusCircle className="CollectionItem__AddIcon" />
      </Link>
    </div>
  );
}
