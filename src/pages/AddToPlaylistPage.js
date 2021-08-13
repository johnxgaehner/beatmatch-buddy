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

  function onAddToPlaylistClick(clickedPlaylistId) {
    // get the clicked playlist object
    const clickedPlaylistInArray = playlists.filter((playlist) => {
      return playlist.id === clickedPlaylistId;
    });
    const clickedPlaylist = clickedPlaylistInArray[0];
    // remove clicked playlist from all playlists array
    const playlistsWithoutClickedPlaylist = playlists.filter((playlist) => {
      return playlist.id !== clickedPlaylistId;
    });

    const patchedPlaylist = {
      ...clickedPlaylist,
      trackIds: [...clickedPlaylist.trackIds, id],
    };

    // concatenate everything
    const patchedPlaylistCollection = [
      ...playlistsWithoutClickedPlaylist,
      patchedPlaylist,
    ];
    localStorage.setItem(
      "savedPlaylists",
      JSON.stringify(patchedPlaylistCollection)
    );
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
    return <div className="ATPP__NoPlaylists">NO PLAYLIST CREATED YET...</div>;
  }

  return (
    <section className="AddToPlaylistPage">
      <Link to="/create-new-playlist" className="ATPP__CreateNewPlaylist">
        <p>CREATE NEW PLAYLIST</p>
      </Link>
      {renderAddToPlaylistItems()}
    </section>
  );
}
