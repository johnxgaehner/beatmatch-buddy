import { Link } from "react-router-dom";
import PlaylistItem from "../components/PlaylistItem";
import useLocalStorage from "../services/useLocalStorage";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useLocalStorage("savedPlaylists", "[]");

  function renderPlaylistItems() {
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
