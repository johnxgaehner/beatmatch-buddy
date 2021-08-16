import { useState } from "react";
import "./CreateNewPlaylistPage.css";
import saveInLocalStorage from "../services/saveInLocalStorage";
import showToastSaved from "../services/showToastSaved";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

export default function CreateNewPlaylistPage() {
  const history = useHistory();

  const [newPlaylist, setNewPlaylist] = useState({
    id: "",
    playlistName: "",
    playlistDescription: "",
    trackIds: "",
  });

  function handleOnChange(event) {
    const key = event.target.name;
    const input = event.target.value;
    const newPlaylistData = { ...newPlaylist, id: uuidv4(), [key]: input };
    setNewPlaylist(newPlaylistData);
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveInLocalStorage("savedPlaylists", newPlaylist);
    showToastSaved("PLAYLIST SAVED");
    resetForm();
    history.goBack();
  }

  function resetForm() {
    setNewPlaylist({
      id: "",
      playlistName: "",
      playlistDescription: "",
      trackIds: "",
    });
  }

  return (
    <section className="CreateNewPlaylistPage">
      <form onSubmit={handleSubmit}>
        <div className="CNPP__row">
          <input
            onChange={handleOnChange}
            value={newPlaylist.playlistName}
            type="text"
            name="playlistName"
            id="playlistName"
            placeholder="ENTER PLAYLIST NAME"
            required
          />
        </div>
        <div className="CNPP__row">
          <input
            onChange={handleOnChange}
            value={newPlaylist.playlistDescription}
            type="text"
            name="playlistDescription"
            id="playlistDescription"
            placeholder="ENTER PLAYLIST DESCRIPTION"
            required
          />
        </div>
        <div className="CNPP__row">
          <button type="submit">SUBMIT</button>
          <button type="reset" onClick={resetForm}>
            CANCEL
          </button>
        </div>
      </form>
    </section>
  );
}
