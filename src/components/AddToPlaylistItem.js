import { Link } from "react-router-dom";
import { ReactComponent as IconSelectionEmpty } from "../assets/icon_selection_empty.svg";
import "./AddToPlaylistItem.css";

export default function PlaylistItem({ data }) {
  return (
    <Link className="AddToPlaylistItem">
      <IconSelectionEmpty />
      <p>{data.playlistName}</p>
    </Link>
  );
}
