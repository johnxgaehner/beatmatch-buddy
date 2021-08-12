import "./PlaylistsPage.css";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";
import { Link } from "react-router-dom";

export default function PlaylistsPage() {
  return (
    <section className="PlaylistsPage">
      <Link className="PlaylistsPage__CreateNewPlaylist">
        <p>CREATE NEW PLAYLIST</p>
      </Link>
      <Link className="PlaylistsPage__PlaylistItem">
        <p>18/09 MOIRÉ</p>
        <IconArrow />
      </Link>
    </section>
  );
}
