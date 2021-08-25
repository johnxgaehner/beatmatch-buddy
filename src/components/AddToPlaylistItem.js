import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import { ReactComponent as IconSelectionEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_circle_filled.svg";
import "./AddToPlaylistItem.css";

export default function PlaylistItem({
  playlist,
  trackId,
  onAddToPlaylistClick,
}) {
  function handleAddToPlaylistClick() {
    onAddToPlaylistClick(playlist.id);
  }

  const transition = useTransition(playlist.trackIds.includes(trackId), {
    initial: { position: "absolute" },
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 150,
    },
  });

  return (
    <div
      className="Row--flat AddToPlaylistItem"
      onClick={handleAddToPlaylistClick}
    >
      <div className="AddToPlaylistItem__SelectionIconContainer">
        {transition((style, item) =>
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
        {playlist.playlistName}
      </p>
    </div>
  );
}

PlaylistItem.propTypes = {
  trackId: PropTypes.string.isRequired,
  playlist: PropTypes.shape({
    id: PropTypes.string,
    playlistName: PropTypes.string,
    playlistDescription: PropTypes.string,
    trackIds: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
  }).isRequired,
  onAddToPlaylistClick: PropTypes.func.isRequired,
};
