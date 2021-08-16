import { ReactComponent as IconSelectionEmpty } from "../assets/icon_selection_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_selection_filled.svg";
import "./AddToPlaylistItem.css";

export default function PlaylistItem({ data, trackId, onAddToPlaylistClick }) {
  function handleButtonClick() {
    onAddToPlaylistClick(data.id);
  }

  return (
    <div className="Row--flat AddToPlaylistItem" onClick={handleButtonClick}>
      {data.trackIds.includes(trackId) ? (
        <IconSelectionFilled />
      ) : (
        <IconSelectionEmpty />
      )}
      <p>{data.playlistName}</p>
    </div>
  );
}
