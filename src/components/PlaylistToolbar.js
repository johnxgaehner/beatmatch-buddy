import PropTypes from "prop-types";

export default function PlaylistToolbar({
  editMode,
  setEditMode,
  addTracksMode,
  setAddTracksMode,
  onDeletePlaylistClick,
}) {
  function toggleAddTracksMode() {
    setAddTracksMode(!addTracksMode);
  }
  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function handleDeletePlaylistClick() {
    onDeletePlaylistClick();
  }

  return (
    <section className="Row--flat --accented --space-between">
      {!editMode ? (
        <button onClick={toggleAddTracksMode}>
          {!addTracksMode ? "Add Tracks" : "Save"}
        </button>
      ) : (
        <button
          onClick={handleDeletePlaylistClick}
          className="PDP__DeleteButton"
        >
          Delete Playlist
        </button>
      )}
      {!addTracksMode && (
        <button onClick={toggleEditMode}>
          {!editMode ? "Edit Playlist" : "Save"}
        </button>
      )}
    </section>
  );
}

PlaylistToolbar.propTypes = {
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  addTracksMode: PropTypes.bool.isRequired,
  setAddTracksMode: PropTypes.func.isRequired,
  onDeletePlaylistClick: PropTypes.func.isRequired,
};
