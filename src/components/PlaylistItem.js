import { Link } from "react-router-dom";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";
import "./PlaylistItem.css";

export default function PlaylistItem({ data }) {
  return (
    <Link className="PlaylistsPage__PlaylistItem">
      <p>{data.playlistName}</p>
      <IconArrow />
    </Link>
  );
}
