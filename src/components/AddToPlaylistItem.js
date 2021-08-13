import { ReactComponent as IconSelectionEmpty } from "../assets/icon_selection_empty.svg";
import "./AddToPlaylistItem.css";

export default function PlaylistItem({ data, onAddToPlaylistClick }) {
  function handleButtonClick() {
    onAddToPlaylistClick(data.id);
  }

  return (
    <div className="AddToPlaylistItem" onClick={handleButtonClick}>
      <IconSelectionEmpty />
      <p>{data.playlistName}</p>
    </div>
  );
}
