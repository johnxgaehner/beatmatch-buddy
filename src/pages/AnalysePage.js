import { useState } from "react";
import { ToastContainer, toast } from "react-toast";
import TapTempo from "../components/TapTempo";
import "./AnalysePage.css";

export default function AnalysePage() {
  const [BPM, setBpm] = useState("");
  const [newTrack, setNewTrack] = useState({
    bpm: "",
    trackTitle: "",
    artistName: "",
    recordTitle: "",
  });

  function handleOnChange(event) {
    const key = event.target.name;
    const input = event.target.value;

    const newTrackData = { ...newTrack, bpm: BPM, [key]: input };
    setNewTrack(newTrackData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const savedTracks = JSON.parse(localStorage.getItem("savedTracks")) || [];
    savedTracks.push(newTrack);

    localStorage.setItem("savedTracks", JSON.stringify(savedTracks));

    toast("TRACK SAVED!", {
      backgroundColor: "#323131",
      color: "#ffffff",
    });

    resetForm();
  }

  function resetForm() {
    setBpm("");
    setNewTrack({
      bpm: "",
      trackTitle: "",
      artistName: "",
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
            value={newTrack.trackTitle}
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
            value={newTrack.artistName}
            type="text"
            name="artistName"
            id="artistName"
            placeholder="ENTER ARTIST"
            required
          />
        </div>

        <div className="AnalysePage__row">
          <input
            onChange={handleOnChange}
            value={newTrack.recordTitle}
            type="text"
            name="recordTitle"
            id="recordTitle"
            placeholder="ENTER RECORD"
            required
          />
        </div>
        <div className="AnalysePage__row">
          <button type="submit">SUBMIT</button>
          <button type="reset" onClick={resetForm}>
            CANCEL
          </button>
        </div>
      </form>
    </section>
  );
}
