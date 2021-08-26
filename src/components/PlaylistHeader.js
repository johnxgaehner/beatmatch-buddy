import PropTypes from "prop-types";
import "./PlaylistHeader.css";

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
      {!editMode ? (
        <>
          <h1
            className={`PlaylistHeader__PlaylistName PlaylistHeader__PlaylistName${getHeaderClass()}`}
          >
            {playlistName}
          </h1>
          <p className="PlaylistHeader__PlaylistDescription">
            {playlistDescription}
          </p>
        </>
      ) : (
        <>
          <div
            className={`PlaylistHeader__PlaylistName--edit PlaylistHeader__PlaylistName--edit${getHeaderClass()}`}
          >
            <input
              onChange={handlePlaylistNameChange}
              name="playlistName"
              id="playlistName"
              type="text"
              placeholder={playlistName}
              value={playlistName}
            />
          </div>
          <div className="PlaylistHeader__PlaylistDescriptionChangeInput">
            <input
              onChange={handlePlaylistNameChange}
              name="playlistDescription"
              id="playlistDescription"
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
