import "./PlaylistsPage.css";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";

export default function PlaylistsPage() {
  return (
    <section className="PlaylistsPage">
      <div className="PlaylistsPage__CreateNewPlaylist">
        <p>CREATE NEW PLAYLIST</p>
      </div>
      <div className="PlaylistsPage__PlaylistItem">
        <p>18/09 MOIRÉ</p>
        <IconArrow />
      </div>
    </section>
  );
}
