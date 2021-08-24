import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import TapTempo from "../components/TapTempo";
import saveInLocalStorage from "../services/saveInLocalStorage";
import showToastSaved from "../services/showToastSaved";
import "./AnalysePage.css";

export default function AnalysePage() {
  let beatCounter = useRef([]);
  const [BPM, setBPM] = useState("");
  const [newTrack, setNewTrack] = useState({
    id: "",
    bpm: "",
    trackTitle: "",
    artistName: "",
    recordTitle: "",
    createdAt: "",
  });

  function handleInputChange(event) {
    const key = event.target.name;
    const input = event.target.value;
    const newTrackData = {
      ...newTrack,
      id: uuidv4(),
      bpm: Number(BPM),
      [key]: input,
      createdAt: new Date(),
    };
    setNewTrack(newTrackData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      newTrack.trackTitle.trim() === "" ||
      newTrack.artistName.trim() === "" ||
      newTrack.recordTitle.trim() === ""
    ) {
      alert("Please write more than just a few spaces.");
      setNewTrack({
        ...newTrack,
        trackTitle: "",
        artistName: "",
        recordTitle: "",
        createdAt: "",
      });
      return;
    }

    saveInLocalStorage("savedTracks", newTrack);
    showToastSaved("SAVED IN YOUR COLLECTION!");
    resetForm();
  }

  function resetForm() {
    beatCounter.current = [];
    setBPM("");
    setNewTrack({
      id: "",
      bpm: "",
      trackTitle: "",
      artistName: "",
      recordTitle: "",
      createdAt: "",
    });
  }

  return (
    <section className="AnalysePage">
      <TapTempo BPM={BPM} setBPM={setBPM} beatCounter={beatCounter} />
      <form onSubmit={handleSubmit}>
        <div className="Row--flat">
          <input
            onChange={handleInputChange}
            value={newTrack.trackTitle}
            type="text"
            name="trackTitle"
            id="trackTitle"
            placeholder="ENTER TRACK"
            maxLength="30"
            required
          />
        </div>

        <div className="Row--flat">
          <input
            onChange={handleInputChange}
            value={newTrack.artistName}
            type="text"
            name="artistName"
            id="artistName"
            placeholder="ENTER ARTIST"
            maxLength="30"
            required
          />
        </div>

        <div className="Row--flat">
          <input
            onChange={handleInputChange}
            value={newTrack.recordTitle}
            type="text"
            name="recordTitle"
            id="recordTitle"
            placeholder="ENTER RECORD"
            maxLength="30"
            required
          />
        </div>
        <div className="Row--flat --space-between">
          <button type="reset" onClick={resetForm}>
            RESET
          </button>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </section>
  );
}
