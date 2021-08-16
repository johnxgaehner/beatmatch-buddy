import { Link } from "react-router-dom";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";

export default function PlaylistItem({ data }) {
  return (
    <Link to={`/playlist/${data.id}`} className="Row--flat --space-between">
      <p>{data.playlistName}</p>
      <IconArrow />
    </Link>
  );
}
