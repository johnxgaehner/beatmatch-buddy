import { ReactComponent as IconSelectionEmpty } from "../assets/icon_selection_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_selection_filled.svg";
import "./AddTrackOnTheFlyItem.css";

export default function AddTrackOnTheFlyItem({
  trackInfo,
  playlist,
  onAddToPlaylistClick,
}) {
  function handleOnAddToPlaylistClick() {
    onAddToPlaylistClick(trackInfo.id);
  }
  return (
    <div className="AddTrackOnTheFlyItem">
      <div onClick={handleOnAddToPlaylistClick}>
        {playlist.trackIds.includes(trackInfo.id) ? (
          <IconSelectionFilled />
        ) : (
          <IconSelectionEmpty />
        )}
      </div>
      <ul>
        <li>{trackInfo.trackTitle}</li>
        <li>{trackInfo.artistName}</li>
        <li>{trackInfo.recordTitle}</li>
        <li>{trackInfo.bpm}BPM</li>
      </ul>
    </div>
  );
}
