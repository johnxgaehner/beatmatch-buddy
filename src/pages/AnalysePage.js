import { useState } from "react";
import { ToastContainer, toast } from "react-toast";
import TapTempo from "../components/TapTempo";
import "./AnalysePage.css";

export default function AnalysePage() {
  const [BPM, setBpm] = useState("");
  const [result, setResult] = useState({
    bpm: "",
    trackTitle: "",
    artist: "",
    recordTitle: "",
  });

  function handleOnChange(event) {
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
      <TapTempo BPM={BPM} setBpm={setBpm} />
      <form onSubmit={handleSubmit}>
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
