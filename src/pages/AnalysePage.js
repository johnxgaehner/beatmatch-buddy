import { useState } from "react";
import "./AnalysePage.css";

export default function AnalysePage() {
  const [BPM, setBpm] = useState("tap to start");

  let lastTapSeconds = 0;
  let beatCounter = [];
  let average = 0;
  let count = 0;

  function tapTempo() {
    const tapSeconds = Date.now();
    const bpm = (1 / ((tapSeconds - lastTapSeconds) / 1000)) * 60;

    lastTapSeconds = tapSeconds;
    beatCounter.push(bpm);

    console.log(beatCounter);
    console.log("average", average);
    console.log("bpm", bpm);

    average *= count;
    average += Math.floor(bpm);
    count++;
    average /= count;

    if (beatCounter.length >= 8) {
      setBpm(average.toFixed(1));
    }
  }

  function renderBPM() {
    return <p>{BPM}</p>;
  }

  return (
    <div>
      <section onClick={tapTempo} className="AnalysePage">
        <div className="BPM">TAP</div>
        {renderBPM()}
      </section>
    </div>
  );
}
