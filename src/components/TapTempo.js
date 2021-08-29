import { useRef } from "react";
import PropTypes from "prop-types";
import { ReactComponent as IconRecDot } from "../assets/icon_recording_dot.svg";

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

  function renderBPM() {
    return !BPM || isNaN(BPM) ? (
      <p className="TapTempo__NoBPM">BPM WILL APPEAR HERE</p>
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
        <IconRecDot />
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
