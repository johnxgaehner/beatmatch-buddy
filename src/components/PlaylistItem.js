import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as IconArrow } from "../assets/icon_arrow.svg";

export default function PlaylistItem({ playlistInfo }) {
  return (
    <Link
      to={`/playlist/${playlistInfo.id}`}
      className="Row--flat --space-between"
    >
      <p>{playlistInfo.playlistName}</p>
      <IconArrow />
    </Link>
  );
}

PlaylistItem.propTypes = {
  playlistInfo: PropTypes.shape({
    id: PropTypes.string,
    playlistName: PropTypes.string,
    playlistDescription: PropTypes.string,
    trackIds: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
  }).isRequired,
};
