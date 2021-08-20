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

  return (
    <div
      className="Row--flat AddToPlaylistItem"
      onClick={handleAddToPlaylistClick}
    >
      {playlist.trackIds.includes(trackId) ? (
        <IconSelectionFilled className="AddToPlaylistItem__SelectionIcon" />
      ) : (
        <IconSelectionEmpty className="AddToPlaylistItem__SelectionIcon" />
      )}
      <p>{playlist.playlistName}</p>
    </div>
  );
}
