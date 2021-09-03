import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import { ReactComponent as IconSelectionEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_circle_filled.svg";
import "./AddToPlaylistItem.css";

export default function PlaylistItem({
  playlistInfo,
  trackId,
  onAddToPlaylistClick,
  className,
}) {
  function handleAddToPlaylistClick() {
    onAddToPlaylistClick(playlistInfo.id);
  }

  const iconTransition = useTransition(
    playlistInfo.trackIds.includes(trackId),
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
    <div className={className} onClick={handleAddToPlaylistClick}>
      <div className="AddToPlaylistItem__SelectionIconContainer">
        {iconTransition((style, item) =>
          item ? (
            <animated.div style={style}>
              <IconSelectionFilled className="AddToPlaylistItem__SelectionIcon" />
            </animated.div>
          ) : (
            <animated.div style={style}>
              <IconSelectionEmpty className="AddToPlaylistItem__SelectionIcon" />
            </animated.div>
          )
        )}
      </div>
      <p className="AddToPlaylistItem__SelectionName">
        {playlistInfo.playlistName}
      </p>
    </div>
  );
}

PlaylistItem.propTypes = {
  trackId: PropTypes.string.isRequired,
  playlistInfo: PropTypes.shape({
    id: PropTypes.string,
    playlistName: PropTypes.string,
    trackIds: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
  }).isRequired,
  onAddToPlaylistClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
