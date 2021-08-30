import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as IconPlusCircle } from "../assets/icon_plus_circle_filled.svg";
import { ReactComponent as RecordPlaceholder } from "../assets/record_placeholder.svg";
import "./CollectionItem.css";

export default function CollectionItem({ trackInfo }) {
  return (
    <div className="CollectionItem">
      <div className="CollectionItem--left">
        {trackInfo.artworkUrl ? (
          <img
            className="CollectionItem__Artwork"
            src={trackInfo.artworkUrl}
            alt={`${trackInfo.trackTitle} artwork`}
          />
        ) : (
          <RecordPlaceholder className="CollectionItem__Artwork" />
        )}
        <div>
          <ul className="CollectionItem__DetailSection">
            <li className="CollectionItem__TrackTitle">
              {trackInfo.trackTitle}
            </li>
            <li className="CollectionItem__ArtistName">
              {trackInfo.artistName}
            </li>
            <li className="CollectionItem__RecordTitle">
              {trackInfo.recordTitle}
            </li>
            <li className="CollectionItem__BPM">{trackInfo.bpm}BPM</li>
          </ul>
        </div>
      </div>
      <Link to={`/collection/add-to-playlist/${trackInfo.id}`}>
        <IconPlusCircle className="CollectionItem__AddIcon" />
      </Link>
    </div>
  );
}

CollectionItem.propTypes = {
  trackInfo: PropTypes.shape({
    id: PropTypes.string,
    bpm: PropTypes.number,
    trackTitle: PropTypes.string,
    artistName: PropTypes.string,
    recordTitle: PropTypes.string,
  }).isRequired,
};
