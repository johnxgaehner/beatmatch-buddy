import { ReactComponent as IconGrab } from "../assets/icon_grab.svg";

import "./TrackItem.css";
import { Draggable } from "react-beautiful-dnd";

export default function TrackItem({ data, index, editMode, onRemoveClick }) {
  function handleRemoveClick() {
    onRemoveClick(data.id);
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
          <li>{data.trackTitle}</li>
          <li>{data.artistName}</li>
          <li>{data.recordTitle}</li>
          <li>{data.bpm}BPM</li>
        </ul>
      </div>
    </li>
  ) : (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="TrackItem"
        >
          <div className="TrackItem--left">
            <p onClick={handleRemoveClick}>DEL</p>
            {/* <IconMinusCircle
              onClick={handleRemoveClick}
              className="TrackItem_IconMinusCircle"
            /> */}
            <ul>
              <li>{data.trackTitle}</li>
              <li>{data.artistName}</li>
              <li>{data.recordTitle}</li>
              <li>{data.bpm}BPM</li>
            </ul>
          </div>
          <IconGrab />
        </li>
      )}
    </Draggable>
  );
}
