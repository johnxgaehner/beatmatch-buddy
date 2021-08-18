import { ReactComponent as IconSelectionEmpty } from "../assets/icon_selection_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_selection_filled.svg";
import "./AddTrackOnTheFlyItem.css";

export default function AddTrackOnTheFlyItem({
  data,
  playlist,
  onAddToPlaylistClick,
}) {
  function handleOnAddToPlaylistClick() {
    onAddToPlaylistClick(data.id);
  }
  return (
    <div className="AddTrackOnTheFlyItem">
      <div onClick={handleOnAddToPlaylistClick}>
        {playlist.trackIds.includes(data.id) ? (
          <IconSelectionFilled />
        ) : (
          <IconSelectionEmpty />
        )}
      </div>
      <ul>
        <li>{data.trackTitle}</li>
        <li>{data.artistName}</li>
        <li>{data.recordTitle}</li>
        <li>{data.bpm}BPM</li>
      </ul>
    </div>
  );
}
