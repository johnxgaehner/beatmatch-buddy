import { Link } from "react-router-dom";
import { ReactComponent as IconPlusCircle } from "../assets/icon_plus_circle_filled.svg";
import { ReactComponent as RecordPlaceholder } from "../assets/record_placeholder.svg";
import "./CollectionItem.css";

export default function CollectionItem({ data }) {
  return (
    <div className="CollectionItem">
      <div className="CollectionItem--left">
        <RecordPlaceholder className="CollectionItem__RecordPlaceholder" />
        <div>
          <ul className="CollectionItem__DetailSection">
            <li className="CollectionItem__TrackTitle">{data.trackTitle}</li>
            <li className="CollectionItem__ArtistName">{data.artistName}</li>
            <li className="CollectionItem__RecordTitle">{data.recordTitle}</li>
            <li className="CollectionItem__BPM">{data.bpm}BPM</li>
          </ul>
        </div>
      </div>
      <Link to={`/collection/add-to-playlist/${data.id}`}>
        <IconPlusCircle className="CollectionItem__AddIcon" />
      </Link>
    </div>
  );
}
