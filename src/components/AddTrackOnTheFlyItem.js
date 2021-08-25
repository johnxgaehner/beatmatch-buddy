import { useTransition, animated } from "react-spring";
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

  const transition = useTransition(playlist.trackIds.includes(trackInfo.id), {
    initial: { position: "absolute" },
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 150,
    },
  });

  return (
    <div onClick={handleOnAddToPlaylistClick} className="AddTrackOnTheFlyItem">
      <div className="AddTrackOnTheFlyItem__SelectionIconContainer">
        {transition((style, item) =>
          item ? (
            <animated.div style={style}>
              <IconSelectionFilled className="AddTrackOnTheFlyItem__SelectionIcon" />
            </animated.div>
          ) : (
            <animated.div style={style}>
              <IconSelectionEmpty className="AddTrackOnTheFlyItem__SelectionIcon" />
            </animated.div>
          )
        )}
      </div>
      <ul className="AddTrackOnTheFlyItem__SelectionTrack">
        <li>{trackInfo.trackTitle}</li>
        <li>{trackInfo.artistName}</li>
        <li>{trackInfo.recordTitle}</li>
        <li>{trackInfo.bpm}BPM</li>
      </ul>
    </div>
  );
}
