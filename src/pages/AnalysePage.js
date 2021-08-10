import { useState } from "react";
import "./AnalysePage.css";
import { ReactComponent as IconRecDot } from "../assets/icon_recording_dot.svg";

export default function AnalysePage() {
  const [BPM, setBpm] = useState("");

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
      setBpm(average.toFixed(1));
    }
  }

  function renderBPM() {
    return BPM ? <p>{Math.floor(BPM)}BPM</p> : <p>BPM WILL APPEAR HERE</p>;
  }

  return (
    <section className="AnalysePage">
      <div onClick={tapTempo} className="AnalysePage__row">
        <p>TAP HERE (MIN 4 TIMES)</p>
        <IconRecDot />
      </div>
      <form>
        <div className="AnalysePage__row">
          {renderBPM()}
          <p>SAVE?</p>
        </div>
        <div className="AnalysePage__row">
          <input
            type="text"
            name="track-title"
            id="track-title"
            placeholder="ENTER TRACK"
          />
        </div>
        <div className="AnalysePage__row">
          <input
            type="text"
            name="artist"
            id="artist"
            placeholder="ENTER ARTIST"
          />
        </div>
        <div className="AnalysePage__row">
          <input
            type="text"
            name="record-title"
            id="record-title"
            placeholder="ENTER RECORD"
          />
        </div>
        <div className="AnalysePage__row">
          <button type="submit">SUBMIT</button>
          <button type="reset">CANCEL</button>
        </div>
      </form>
    </section>
  );
}
