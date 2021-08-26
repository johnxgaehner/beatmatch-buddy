import PropTypes from "prop-types";

export default function PlaylistHeader({
  editMode,
  headerIsHidden,
  playlistName,
  playlistDescription,
  onPlaylistNameChange,
}) {
  function getHeaderClass() {
    return headerIsHidden ? "--hidden" : "";
  }
  function handlePlaylistNameChange(event) {
    onPlaylistNameChange(event);
  }

  return (
    <section>
      {editMode ? (
        <>
          <h1 className={`PDP__PlaylistName ${getHeaderClass()}`}>
            {playlistName}
          </h1>
          <div className="Row--flat --accented">{playlistDescription}</div>
        </>
      ) : (
        <>
          <div>
            <input
              onChange={handlePlaylistNameChange}
              name="playlistName"
              id="playlistName"
              className={`PDP__PlaylistName--edit ${getHeaderClass()}`}
              type="text"
              placeholder={playlistName}
              value={playlistName}
            />
          </div>
          <div className="Row--flat">
            <input
              onChange={handlePlaylistNameChange}
              name="playlistDescription"
              id="playlistDescription"
              className="PDP__PlaylistDescriptionChangeInput"
              type="text"
              placeholder={playlistDescription}
              value={playlistDescription}
            />
          </div>
        </>
      )}
    </section>
  );
}

PlaylistHeader.propTypes = {
  editMode: PropTypes.bool.isRequired,
  headerIsHidden: PropTypes.bool.isRequired,
  playlistName: PropTypes.string.isRequired,
  playlistDescription: PropTypes.string.isRequired,
  onPlaylistNameChange: PropTypes.func.isRequired,
};
