import PropTypes from "prop-types";

export default function PlaylistHeader({
  headerIsHidden,
  playlistName,
  playlistDescription,
}) {
  function getHeaderClass() {
    return headerIsHidden ? "--hidden" : "";
  }

  return (
    <section>
      <h1 className={`PDP__PlaylistName ${getHeaderClass()}`}>
        {playlistName}
      </h1>
      <div className="Row--flat --accented">{playlistDescription}</div>
    </section>
  );
}

PlaylistHeader.propTypes = {
  headerIsHidden: PropTypes.bool.isRequired,
  playlistName: PropTypes.string.isRequired,
  playlistDescription: PropTypes.string.isRequired,
};
