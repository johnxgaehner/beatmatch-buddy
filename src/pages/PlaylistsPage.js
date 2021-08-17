import { Link } from "react-router-dom";
import PlaylistItem from "../components/PlaylistItem";
import { useState, useEffect } from "react";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
    storedPlaylists
      ? setPlaylists(
          storedPlaylists.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
        )
      : setPlaylists(storedPlaylists);
  }, []);

  function renderPlaylistItems() {
    console.log(playlists);
    if (!playlists || playlists.length === 0) {
      return <div className="Row--flat">NO PLAYLIST CREATED YET...</div>;
    }
    const playlistItems = playlists.map((playlist) => {
      return <PlaylistItem key={playlist.id} data={playlist} />;
    });
    return playlistItems;
  }

  return (
    <section className="PlaylistsPage">
      <Link to="/create-new-playlist" className="Row--flat --accented">
        <p>CREATE NEW PLAYLIST</p>
      </Link>
      {renderPlaylistItems()}
    </section>
  );
}
