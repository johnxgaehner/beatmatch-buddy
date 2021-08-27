import PropTypes from "prop-types";
import "./PlaylistToolbar.css";

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

  function renderToolbar() {
    if (editMode) {
      return (
        <>
          <button
            onClick={handleDeletePlaylistClick}
            className="PlaylistToolbar__DeleteButton"
          >
            Delete Playlist
          </button>
          <button onClick={toggleEditMode}>Save</button>
        </>
      );
    }
    if (addTracksMode) {
      return (
        <>
          <button onClick={toggleAddTracksMode}>Save</button>
        </>
      );
    }
    return (
      <>
        <button onClick={toggleAddTracksMode}>Add Tracks</button>
        <button onClick={toggleEditMode}>Edit Playlist</button>
      </>
    );
  }

  return (
    <section className="Row--flat --accented --space-between">
      {renderToolbar()}
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
