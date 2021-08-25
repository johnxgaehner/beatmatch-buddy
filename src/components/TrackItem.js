import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { ReactComponent as IconGrab } from "../assets/icon_grab.svg";
import { ReactComponent as IconMinusCircle } from "../assets/icon_minus_circle_filled.svg";
import "./TrackItem.css";

export default function TrackItem({
  trackInfo,
  index,
  editMode,
  onDeleteTrackClick,
}) {
  function handleDeleteTrackClick() {
    onDeleteTrackClick(trackInfo.id);
  }

  return !editMode ? (
    <li className="TrackItem">
      <div className="TrackItem--left">
        {index < 9 ? (
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
              onClick={handleDeleteTrackClick}
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

TrackItem.propTypes = {
  trackInfo: PropTypes.shape({
    id: PropTypes.string,
    bpm: PropTypes.number,
    trackTitle: PropTypes.string,
    artistName: PropTypes.string,
    recordTitle: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  onDeleteTrackClick: PropTypes.func.isRequired,
};
