import { ReactComponent as IconRecDot } from "../assets/icon_recording_dot.svg";

export default function TapTempo({ BPM, setBPM }) {
  let lastTapSeconds = 0;
  let beatCounter = [];
  let average = 0;
  let count = 0;

  function tapTempo() {
    const tapSeconds = Date.now();
    const bpm = (1 / ((tapSeconds - lastTapSeconds) / 1000)) * 60;

    lastTapSeconds = tapSeconds;
    beatCounter.push(bpm);

    average *= count;
    average += Math.floor(bpm);
    count++;
    average /= count;

    if (beatCounter.length >= 4) {
      setBPM(Math.floor(average));
    }
  }

  function renderBPM() {
    return BPM ? <p>{BPM}BPM</p> : <p>BPM WILL APPEAR HERE</p>;
  }

  return (
    <>
      <div
        onClick={tapTempo}
        className="AnalysePage__row AnalysePage__tap-tempo-row"
      >
        <p>TAP HERE (MIN 4 TIMES)</p>
        <IconRecDot />
      </div>
      <div className="AnalysePage__row">{renderBPM()}</div>
    </>
  );
}
