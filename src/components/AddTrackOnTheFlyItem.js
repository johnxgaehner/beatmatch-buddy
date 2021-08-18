import { ReactComponent as IconSelectionEmpty } from "../assets/icon_selection_empty.svg";
import "./AddTrackOnTheFlyItem.css";

export default function AddTrackOnTheFlyItem({ data }) {
  return (
    <div className="AddTrackOnTheFlyItem">
      <IconSelectionEmpty />
      <ul>
        <li>{data.trackTitle}</li>
        <li>{data.artistName}</li>
        <li>{data.recordTitle}</li>
        <li>{data.bpm}BPM</li>
      </ul>
    </div>
  );
}
