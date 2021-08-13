import { useRef } from "react";
import { ReactComponent as IconRecDot } from "../assets/icon_recording_dot.svg";

export default function TapTempo({ BPM, setBPM }) {
  let lastTapTiming = useRef(0);
  let tapTiming = useRef(0);
  const beatCounter = useRef([]);

  function tapTempo() {
    tapTiming.current = Date.now();
    const bpm = (1 / ((tapTiming.current - lastTapTiming.current) / 1000)) * 60;
    lastTapTiming.current = tapTiming.current;
    beatCounter.current.push(bpm);
    const currentBPM = average(beatCounter.current);
    setBPM(currentBPM.toFixed(0));
  }

  function average(array) {
    var sum = 0;
    for (let i = 1; i < array.length; i++) {
      sum += array[i];
    }
    return sum / (array.length - 1);
  }

  function renderBPM() {
    return !BPM || isNaN(BPM) ? <p>BPM WILL APPEAR HERE</p> : <p>{BPM}BPM</p>;
  }

  return (
    <>
      <div
        onClick={tapTempo}
        className="AnalysePage__row AnalysePage__tap-tempo-row"
      >
        <p>TAP HERE</p>
        <IconRecDot />
      </div>
      <div className="AnalysePage__row">{renderBPM()}</div>
    </>
  );
}
