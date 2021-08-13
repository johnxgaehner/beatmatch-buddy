import { Link, useParams } from "react-router-dom";
import "./AddToPlaylistPage.css";

export default function AddToPlaylistPage() {
  const { id } = useParams();

  return (
    <section className="AddToPlaylistPage">
      <Link to="/create-new-playlist" className="ATPP__CreateNewPlaylist">
        <p>CREATE NEW PLAYLIST</p>
      </Link>
      {id}
    </section>
  );
}
