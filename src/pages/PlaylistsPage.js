import "./PlaylistsPage.css";
import { Link } from "react-router-dom";
import PlaylistItem from "../components/PlaylistItem";
import { useState, useEffect } from "react";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
    setPlaylists(
      storedPlaylists.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
    );
  }, []);

  function renderPlaylistItems() {
    if (playlists) {
      const playlistItems = playlists.map((playlist) => {
        return <PlaylistItem key={playlist.id} data={playlist} />;
      });
      return playlistItems;
    }
    return (
      <div className="PlaylistsPage__NoPlaylists">
        NO PLAYLIST CREATED YET...
      </div>
    );
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
