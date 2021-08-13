import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToPlaylistItem from "../components/AddToPlaylistItem";
import "./AddToPlaylistPage.css";

export default function AddToPlaylistPage() {
  const { id } = useParams();
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
    setPlaylists(storedPlaylists);
  }, []);

  function onAddToPlaylistClick() {
    console.log(id);
  }

  function renderAddToPlaylistItems() {
    if (playlists) {
      const playlistItems = playlists.map((playlist) => {
        return (
          <AddToPlaylistItem
            onAddToPlaylistClick={onAddToPlaylistClick}
            key={playlist.id}
            data={playlist}
          />
        );
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
    <section className="AddToPlaylistPage">
      <Link to="/create-new-playlist" className="ATPP__CreateNewPlaylist">
        <p>CREATE NEW PLAYLIST</p>
      </Link>
      {renderAddToPlaylistItems()}
      {id}
    </section>
  );
}
