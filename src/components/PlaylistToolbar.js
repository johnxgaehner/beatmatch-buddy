import PropTypes from "prop-types";
import "./PlaylistToolbar.css";

export default function PlaylistToolbar({
  editMode,
  setEditMode,
  addTracksMode,
  setAddTracksMode,
  setConfirmIsOpen,
  onSearchInput,
}) {
  function toggleAddTracksMode() {
    setAddTracksMode(!addTracksMode);
  }

  function handleSearchInput(event) {
    onSearchInput(event);
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function handleDeletePlaylistClick() {
    setConfirmIsOpen(true);
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
          <button onClick={toggleEditMode}>Save Changes</button>
        </>
      );
    }
    if (addTracksMode) {
      return (
        <>
          <input
            onChange={handleSearchInput}
            className="PlaylistToolbar__SearchInput"
            type="text"
            name="SearchFilter"
            id="SearchFilter"
            placeholder="SEARCH:"
          />
          <button onClick={toggleAddTracksMode}>Save Changes</button>
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

  return <section className="PlaylistToolbar">{renderToolbar()}</section>;
}

PlaylistToolbar.propTypes = {
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  addTracksMode: PropTypes.bool.isRequired,
  setAddTracksMode: PropTypes.func.isRequired,
  setConfirmIsOpen: PropTypes.func.isRequired,
  onSearchInput: PropTypes.func.isRequired,
};
