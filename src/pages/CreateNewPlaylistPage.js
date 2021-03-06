import { useState } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import saveInLocalStorage from "../services/saveInLocalStorage";
import showToast from "../services/showToast";
import "./CreateNewPlaylistPage.css";

export default function CreateNewPlaylistPage() {
  const history = useHistory();

  const [newPlaylist, setNewPlaylist] = useState({
    id: "",
    playlistName: "",
    playlistDescription: "",
    trackIds: "",
    createdAt: new Date(),
  });

  function handleInputChange(event) {
    const key = event.target.name;
    const input = event.target.value;
    const newPlaylistData = { ...newPlaylist, id: nanoid(10), [key]: input };
    setNewPlaylist(newPlaylistData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      newPlaylist.playlistName.trim() === "" ||
      newPlaylist.playlistDescription.trim() === ""
    ) {
      alert("Please write more than just a few spaces.");
      setNewPlaylist({
        ...newPlaylist,
        playlistName: "",
        playlistDescription: "",
      });
      return;
    }

    saveInLocalStorage("savedPlaylists", newPlaylist);
    showToast("PLAYLIST WAS CREATED.");
    resetForm();
    history.goBack();
  }

  function resetForm() {
    setNewPlaylist({
      id: "",
      playlistName: "",
      playlistDescription: "",
      trackIds: "",
      createdAt: "",
    });
  }

  return (
    <section className="CreateNewPlaylistPage">
      <form onSubmit={handleSubmit}>
        <div className="Row--flat">
          <input
            onChange={handleInputChange}
            value={newPlaylist.playlistName}
            type="text"
            name="playlistName"
            id="playlistName"
            placeholder="ENTER PLAYLIST NAME"
            maxLength="28"
            required
          />
        </div>
        <div className="Row--flat">
          <input
            onChange={handleInputChange}
            value={newPlaylist.playlistDescription}
            type="text"
            name="playlistDescription"
            id="playlistDescription"
            placeholder="ENTER PLAYLIST DESCRIPTION"
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
