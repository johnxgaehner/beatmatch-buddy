import PropTypes from "prop-types";

export default function PlaylistHeaderEditMode({
  headerIsHidden,
  onPlaylistNameChange,
  playlistName,
  playlistDescription,
}) {
  function handlePlaylistNameChange(event) {
    onPlaylistNameChange(event);
  }

  function getHeaderClass() {
    return headerIsHidden ? "--hidden" : "";
  }

  return (
    <section>
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
    </section>
  );
}

PlaylistHeaderEditMode.propTypes = {
  headerIsHidden: PropTypes.bool.isRequired,
  onPlaylistNameChange: PropTypes.func.isRequired,
  playlistName: PropTypes.string.isRequired,
  playlistDescription: PropTypes.string.isRequired,
};
