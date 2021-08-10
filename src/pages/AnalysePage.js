import { useState } from "react";
import { ToastContainer, toast } from "react-toast";
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
      setBpm(Math.floor(average));
    }
  }

  function renderBPM() {
    return BPM ? <p>{BPM}BPM</p> : <p>BPM WILL APPEAR HERE</p>;
  }

  const [result, setResult] = useState({
    bpm: "",
    trackTitle: "",
    artist: "",
    recordTitle: "",
  });

  function handleOnChange(event) {
    console.log(result);
    const key = event.target.name;
    const input = event.target.value;

    const newResult = { ...result, bpm: BPM, [key]: input };
    setResult(newResult);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const savedTracks = JSON.parse(localStorage.getItem("savedTracks")) || [];
    savedTracks.push(result);

    localStorage.setItem("savedTracks", JSON.stringify(savedTracks));
    setBpm("");
    toast("Track was saved!", {
      border: "1px solid black",
      backgroundColor: "#323131",
      color: "#ffffff",
    });

    resetForm();
  }

  function resetForm() {
    setResult({
      bpm: "",
      trackTitle: "",
      artist: "",
      recordTitle: "",
    });
  }

  return (
    <section className="AnalysePage">
      <ToastContainer delay={3000} position="bottom-center" />
      <div
        onClick={tapTempo}
        className="AnalysePage__row AnalysePage__tap-tempo-row"
      >
        <p>TAP HERE (MIN 4 TIMES)</p>
        <IconRecDot />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="AnalysePage__row">{renderBPM()}</div>
        <div className="AnalysePage__row">
          <input
            onChange={handleOnChange}
            value={result.trackTitle}
            type="text"
            name="trackTitle"
            id="trackTitle"
            placeholder="ENTER TRACK"
            required
          />
        </div>

        <div className="AnalysePage__row">
          <input
            onChange={handleOnChange}
            value={result.artist}
            type="text"
            name="artist"
            id="artist"
            placeholder="ENTER ARTIST"
            required
          />
        </div>

        <div className="AnalysePage__row">
          <input
            onChange={handleOnChange}
            value={result.recordTitle}
            type="text"
            name="recordTitle"
            id="recordTitle"
            placeholder="ENTER RECORD"
            required
          />
        </div>
        <div className="AnalysePage__row">
          <button type="submit">SUBMIT</button>
          <button onClick={resetForm}>CANCEL</button>
        </div>
      </form>
    </section>
  );
}
