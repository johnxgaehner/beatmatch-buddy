import { ReactComponent as IconGrab } from "../assets/icon_grab.svg";
import { ReactComponent as IconMinusCircle } from "../assets/icon_minus_circle_filled.svg";

import "./TrackItem.css";
import { Draggable } from "react-beautiful-dnd";

export default function TrackItem({
  trackInfo,
  index,
  editMode,
  onRemoveClick,
}) {
  function handleRemoveClick() {
    onRemoveClick(trackInfo.id);
  }

  return !editMode ? (
    <li className="TrackItem">
      <div className="TrackItem--left">
        {index < 10 ? (
          <p className="TrackItem__Index">{`#0${index + 1}`}</p>
        ) : (
          <p className="TrackItem__Index">{`#${index + 1}`}</p>
        )}
        <ul>
          <li>{trackInfo.trackTitle}</li>
          <li>{trackInfo.artistName}</li>
          <li>{trackInfo.recordTitle}</li>
          <li>{trackInfo.bpm}BPM</li>
        </ul>
      </div>
    </li>
  ) : (
    <Draggable draggableId={trackInfo.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="TrackItem"
        >
          <div className="TrackItem--left">
            <div
              onClick={handleRemoveClick}
              className="TrackItem__IconMinusCircle"
            >
              <IconMinusCircle />
            </div>
            <ul>
              <li>{trackInfo.trackTitle}</li>
              <li>{trackInfo.artistName}</li>
              <li>{trackInfo.recordTitle}</li>
              <li>{trackInfo.bpm}BPM</li>
            </ul>
          </div>
          <div {...provided.dragHandleProps} className="TrackItem__DragArea">
            <IconGrab />
          </div>
        </li>
      )}
    </Draggable>
  );
}
