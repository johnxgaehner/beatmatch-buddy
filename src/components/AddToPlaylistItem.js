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
