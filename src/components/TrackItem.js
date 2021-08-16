import { ReactComponent as IconMinus } from "../assets/icon_minus.svg";
import "./TrackItem.css";

export default function TrackItem({ data, index }) {
  return (
    <div className="TrackItem">
      <div className="TrackItem--left">
        {index < 10 ? (
          <p className="TrackItem__Index">{`#0${index + 1}`}</p>
        ) : (
          <p className="TrackItem__Index">{`#${index + 1}`}</p>
        )}
        <ul>
          <li>{data.trackTitle}</li>
          <li>{data.artistName}</li>
          <li>{data.recordTitle}</li>
          <li>{data.bpm}</li>
        </ul>
      </div>
      <IconMinus className="TrackItem__MinusIcon" />
    </div>
  );
}
