import PropTypes from "prop-types";
import { ReactComponent as RecordPlaceholder } from "../assets/record_placeholder.svg";
import "./TrackArtwork.css";

export default function TrackArtwork({ artworkUrl, trackTitle }) {
  function renderArtwork() {
    return artworkUrl ? (
      <img
        className="TrackArtwork__Image"
        src={artworkUrl}
        alt={`${trackTitle} artwork`}
      />
    ) : (
      <RecordPlaceholder className="TrackArtwork__Image" />
    );
  }

  return renderArtwork();
}

TrackArtwork.propTypes = {
  artworkUrl: PropTypes.string,
  trackTitle: PropTypes.string.isRequired,
};
