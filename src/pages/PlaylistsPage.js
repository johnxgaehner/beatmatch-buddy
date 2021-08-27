import { Link } from "react-router-dom";
import PlaylistItem from "../components/PlaylistItem";
import useLocalStorage from "../hooks/useLocalStorage";

export default function PlaylistsPage() {
  const [playlists] = useLocalStorage("savedPlaylists", []);

  function renderPlaylistItems() {
    if (playlists.length > 0) {
      const playlistsCollection = [...playlists];
      playlistsCollection.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      const playlistItems = playlistsCollection.map((playlist) => {
        return (
          <PlaylistItem
            key={playlist.id}
            playlistId={playlist.id}
            playlistName={playlist.playlistName}
          />
        );
      });
      return playlistItems;
    }
    return <div className="Row--flat">No Playlist Created Yet...</div>;
  }

  return (
    <section className="PlaylistsPage">
      <Link to="/create-new-playlist" className="Row--flat --accented">
        <p>Create New Playlist</p>
      </Link>
      {renderPlaylistItems()}
    </section>
  );
}
