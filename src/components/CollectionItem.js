import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as IconPlusCircle } from "../assets/icon_plus_circle_filled.svg";
import TrackArtwork from "./TrackArtwork";
import "./CollectionItem.css";

export default function CollectionItem({ trackInfo, className }) {
  return (
    <div className={className}>
      <div className="CollectionItem--left">
        <TrackArtwork
          artworkUrl={trackInfo.artworkUrl}
          trackTitle={trackInfo.trackTitle}
        />
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
      <Link
        className="CollectionItem__AddIconContainer"
        to={`/collection/add-to-playlist/${trackInfo.id}`}
      >
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
