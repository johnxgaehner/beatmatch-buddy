import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";

export default function PlaylistItem({ playlistId, playlistName }) {
  return (
    <Link to={`/playlist/${playlistId}`} className="Row--flat --space-between">
      <p>{playlistName}</p>
      <IconArrow />
    </Link>
  );
}

PlaylistItem.propTypes = {
  playlistId: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
};
