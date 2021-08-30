import { useRef } from "react";
import PropTypes from "prop-types";
import { ReactComponent as IconCircleEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconCircleFilled } from "../assets/icon_circle_filled.svg";

export default function TapTempo({ BPM, setBPM, beatCounter }) {
  let lastTapTiming = useRef(0);
  let tapTiming = useRef(0);

  function tapTempo() {
    tapTiming.current = Date.now();
    const singleBpmValue =
      (1 / ((tapTiming.current - lastTapTiming.current) / 1000)) * 60;
    lastTapTiming.current = tapTiming.current;
    beatCounter.current.push(singleBpmValue);
    const currentBPM = average(beatCounter.current);
    setBPM(currentBPM.toFixed(0));
  }

  function average(array) {
    let sum = 0;
    for (let i = 1; i < array.length; i++) {
      sum += array[i];
    }
    return sum / (array.length - 1);
  }

  function renderDots() {
    switch (beatCounter.current.length) {
      case 0:
        return (
          <div className="TapTempo__CountIconContainer">
            <IconCircleEmpty className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
          </div>
        );
      case 1:
        return (
          <div className="TapTempo__CountIconContainer">
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
          </div>
        );
      case 2:
        return (
          <div className="TapTempo__CountIconContainer">
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
          </div>
        );
      case 3:
        return (
          <div className="TapTempo__CountIconContainer">
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleEmpty className="TapTempo__CountIcon" />
          </div>
        );
      default:
        return (
          <div className="TapTempo__CountIconContainer">
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleFilled className="TapTempo__CountIcon" />
            <IconCircleFilled className="TapTempo__CountIcon" />
          </div>
        );
    }
  }

  function renderBPM() {
    return !BPM || isNaN(BPM) || beatCounter.current.length < 4 ? (
      <p>BPM WILL APPEAR HERE</p>
    ) : (
      <p>{BPM}BPM</p>
    );
  }

  return (
    <>
      <div
        onClick={tapTempo}
        className="Row--flat --space-between --disable-select TapTempo__Row"
      >
        <p>TAP HERE</p>
        {renderDots()}
      </div>
      <div className="Row--flat --disable-select">{renderBPM()}</div>
    </>
  );
}

TapTempo.propTypes = {
  BPM: PropTypes.string.isRequired,
  setBPM: PropTypes.func.isRequired,
  beatCounter: PropTypes.shape({
    current: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};
