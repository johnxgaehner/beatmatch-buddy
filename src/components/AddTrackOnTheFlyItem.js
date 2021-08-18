import { ReactComponent as IconSelectionEmpty } from "../assets/icon_selection_empty.svg";
import "./AddTrackOnTheFlyItem.css";

export default function AddTrackOnTheFlyItem() {
  return (
    <div className="AddTrackOnTheFlyItem">
      <IconSelectionEmpty />
      <ul>
        <li>Smudge</li>
        <li>Eden Burns</li>
        <li>Big Beat Manifesto</li>
        <li>130BPM</li>
      </ul>
    </div>
  );
}
