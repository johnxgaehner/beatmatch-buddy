import { Link } from "react-router-dom";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";
import "./PlaylistItem.css";

export default function PlaylistItem() {
  return (
    <Link className="PlaylistsPage__PlaylistItem">
      <p>18/09 MOIRÉ</p>
      <IconArrow />
    </Link>
  );
}
