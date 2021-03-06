import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";
import "./PlaylistItem.css";

export default function PlaylistItem({ playlistId, playlistName, className }) {
  return (
    <Link to={`/playlist/${playlistId}`} className={className}>
      <p>{playlistName}</p>
      <IconArrow />
    </Link>
  );
}

PlaylistItem.propTypes = {
  playlistId: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
