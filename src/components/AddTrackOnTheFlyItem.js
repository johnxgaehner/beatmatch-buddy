import { ReactComponent as IconSelectionEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_circle_filled.svg";
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
    <div onClick={handleOnAddToPlaylistClick} className="AddTrackOnTheFlyItem">
      <div>
        {playlist.trackIds.includes(trackInfo.id) ? (
          <IconSelectionFilled className="AddTrackOnTheFlyItem__SelectionIcon" />
        ) : (
          <IconSelectionEmpty className="AddTrackOnTheFlyItem__SelectionIcon" />
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
