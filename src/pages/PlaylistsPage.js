import "./PlaylistsPage.css";
import { Link } from "react-router-dom";
import PlaylistItem from "../components/PlaylistItem";
import { useState, useEffect } from "react";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
    setPlaylists(storedPlaylists);
  }, []);

  function renderPlaylistItems() {
    if (playlists) {
      const playlistItems = playlists.map((track) => {
        return <PlaylistItem />;
      });
      return playlistItems;
    }
  }

  return (
    <section className="PlaylistsPage">
      <Link
        to="/create-new-playlist"
        className="PlaylistsPage__CreateNewPlaylist"
      >
        <p>CREATE NEW PLAYLIST</p>
      </Link>
      {renderPlaylistItems()}
    </section>
  );
}
