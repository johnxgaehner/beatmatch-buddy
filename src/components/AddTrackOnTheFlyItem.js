import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import TrackArtwork from "./TrackArtwork";
import { ReactComponent as IconSelectionEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_circle_filled.svg";
import "./AddTrackOnTheFlyItem.css";

export default function AddTrackOnTheFlyItem({
  trackInfo,
  playlistTrackIds,
  onAddToPlaylistClick,
  className,
}) {
  function handleOnAddToPlaylistClick() {
    onAddToPlaylistClick(trackInfo.id);
  }

  const iconTransition = useTransition(
    playlistTrackIds.includes(trackInfo.id),
    {
      initial: { position: "absolute" },
      from: { position: "absolute", opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: {
        duration: 150,
      },
    }
  );

  return (
    <div onClick={handleOnAddToPlaylistClick} className={className}>
      <div className="AddTrackOnTheFlyItem__SelectionIconContainer">
        {iconTransition((style, item) =>
          item ? (
            <animated.div style={style}>
              <IconSelectionFilled className="AddTrackOnTheFlyItem__SelectionIcon" />
            </animated.div>
          ) : (
            <animated.div style={style}>
              <IconSelectionEmpty className="AddTrackOnTheFlyItem__SelectionIcon" />
            </animated.div>
          )
        )}
      </div>
      <TrackArtwork
        artworkUrl={trackInfo.artworkUrl}
        trackTitle={trackInfo.trackTitle}
      />
      <ul className="AddTrackOnTheFlyItem__SelectionTrack">
        <li>{trackInfo.trackTitle}</li>
        <li>{trackInfo.artistName}</li>
        <li>{trackInfo.recordTitle}</li>
        <li>{trackInfo.bpm}BPM</li>
      </ul>
    </div>
  );
}

AddTrackOnTheFlyItem.propTypes = {
  trackInfo: PropTypes.shape({
    id: PropTypes.string,
    bpm: PropTypes.number,
    trackTitle: PropTypes.string,
    artistName: PropTypes.string,
    recordTitle: PropTypes.string,
  }).isRequired,
  playlistTrackIds: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  onAddToPlaylistClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
