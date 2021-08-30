import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import TapTempo from "../components/TapTempo";
import saveInLocalStorage from "../services/saveInLocalStorage";
import showToast from "../services/showToast";
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

  // --------------------------------------------
  // ---------- FETCH ARTWORKS SECTION ----------
  // --------------------------------------------

  // pls don't make me regret to make this public for you

  const authEndpoint = "https://accounts.spotify.com/api/token";
  const clientId = "55b9f829a2e7449da28119bc679d6b70";
  const clientSecret = "5d3899109bb040f5b708ff630c8630be";
  const authString = `${clientId}:${clientSecret}`;
  const authorization = Buffer.from(authString).toString("base64");

  const apiEndpoint = "https://api.spotify.com/v1/search";
  const artistSearchParam = newTrack.artistName.replace(" ", "%20");
  const trackSearchParam = newTrack.trackTitle.replace(" ", "%20");
  const searchUrl = `${apiEndpoint}?q=${artistSearchParam}%20${trackSearchParam}&type=track&limit=1`;

  async function getArtwork() {
    const authToken = await fetch(authEndpoint, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authorization}`,
      },
    })
      .then((res) => res.json())
      .then((json) => json.access_token);

    const artwork = await fetch(searchUrl, {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data.tracks.items[0].album.images[2].url);

    console.log(artwork);
    return artwork;
  }

  // --------------------------------------------
  // ------------------ SUBMIT ------------------
  // --------------------------------------------

  async function handleSubmit(event) {
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

    const artworkUrl = await getArtwork();

    const newTrackWithArtwork = { ...newTrack, artworkUrl };

    saveInLocalStorage("savedTracks", newTrackWithArtwork);
    showToast("SAVED IN YOUR COLLECTION!");
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
