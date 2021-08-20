import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddTrackOnTheFlyItem from "../components/AddTrackOnTheFlyItem";
import TrackItem from "../components/TrackItem";
import updatePlaylists from "../services/updatePlaylists";
import useLocalStorage from "../hooks/useLocalStorage";
import "./PlaylistDetailPage.css";

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();
  const history = useHistory();

  const [tracks] = useLocalStorage("savedTracks", []);
  const [playlists, setPlaylists] = useLocalStorage("savedPlaylists", []);
  const [playlist, setPlaylist] = useState();

  const [editMode, setEditMode] = useState(false);
  const [addTracksMode, setaddTracksMode] = useState(false);

  useEffect(() => {
    const requestedPlaylist = playlists.find((playlist) => {
      return playlist.id === playlistId;
    });
    setPlaylist(requestedPlaylist);
  }, [playlists, playlistId]);

  function renderTracksFromPlaylist() {
    if (tracks && playlist) {
      if (playlist.trackIds.length === 0 || tracks.length === 0) {
        return <div className="Row--flat">NO TRACKS IN HERE YET...</div>;
      }
      const includedTracks = playlist.trackIds.map((trackId) => {
        const includedTrack = tracks.find((element) => element.id === trackId);
        return includedTrack;
      });
      const trackItems = includedTracks.map((track, index) => {
        return (
          <TrackItem
            key={track.id}
            index={index}
            trackInfo={track}
            editMode={editMode}
            onDeleteTrackClick={onDeleteTrackClick}
          />
        );
      });
      return trackItems;
    }
  }

  // --- ADD TRACKS MODE
  function toggleAddTracksMode() {
    setaddTracksMode(!addTracksMode);
  }

  function renderCollection() {
    if (tracks.length === 0) {
      return <div className="Row--flat">YOUR COLLECTION IS EMPTY...</div>;
    }
    const addTrackOnTheFlyItems = tracks.map((track) => {
      return (
        <AddTrackOnTheFlyItem
          key={track.id}
          trackInfo={track}
          playlist={playlist}
          onAddToPlaylistClick={onAddToPlaylistClick}
        />
      );
    });
    return addTrackOnTheFlyItems;
  }

  function onAddToPlaylistClick(clickedTrackId) {
    const patchedTrackIds = [...playlist.trackIds];

    patchedTrackIds.includes(clickedTrackId)
      ? patchedTrackIds.splice(patchedTrackIds.indexOf(clickedTrackId), 1)
      : patchedTrackIds.push(clickedTrackId);

    const patchedPlaylist = { ...playlist, trackIds: patchedTrackIds };

    const updatedPlaylists = updatePlaylists(
      playlists,
      playlistId,
      patchedPlaylist
    );
    setPlaylists(updatedPlaylists);
  }

  // --- EDIT PLAYLIST MODE
  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function handlePlaylistNameChange(event) {
    const input = event.target;
    const value = input.value;
    const key = input.name;

    const patchedPlaylist = { ...playlist, [key]: value };

    const updatedPlaylists = updatePlaylists(
      playlists,
      playlistId,
      patchedPlaylist
    );
    setPlaylists(updatedPlaylists);
  }

  function handleDeletePlaylistClick() {
    const confirmation = window.confirm(
      "Do you really want to delete this playlist?"
    );
    if (confirmation) {
      const playlistsWithoutCurrentPlaylist = playlists.filter((playlist) => {
        return playlist.id !== playlistId;
      });
      setPlaylists(playlistsWithoutCurrentPlaylist);
      history.goBack();
    }
  }

  function onDeleteTrackClick(trackId) {
    const newTrackIds = [...playlist.trackIds];
    newTrackIds.splice(newTrackIds.indexOf(trackId), 1);

    const patchedPlaylist = { ...playlist, trackIds: newTrackIds };

    const updatedPlaylists = updatePlaylists(
      playlists,
      playlistId,
      patchedPlaylist
    );
    setPlaylists(updatedPlaylists);
  }

  function handleOnDragEnd(result) {
    if (result.destination) {
      const trackOrder = [...playlist.trackIds];
      const [reorderedTracks] = trackOrder.splice(result.source.index, 1);
      trackOrder.splice(result.destination.index, 0, reorderedTracks);

      const patchedPlaylist = { ...playlist, trackIds: trackOrder };

      const updatedPlaylists = updatePlaylists(
        playlists,
        playlistId,
        patchedPlaylist
      );
      setPlaylists(updatedPlaylists);
    }
  }

  return (
    <section>
      {!playlist || playlist === [] ? (
        <p>loading...</p>
      ) : !editMode ? (
        <>
          <h1 className="PDP__PlaylistName">{playlist.playlistName}</h1>
          <div className="Row--flat --accented">
            {playlist.playlistDescription}
          </div>
        </>
      ) : (
        <>
          <div>
            <input
              onChange={handlePlaylistNameChange}
              name="playlistName"
              id="playlistName"
              className="PDP__PlaylistName--edit"
              type="text"
              placeholder={playlist.playlistName}
              value={playlist.playlistName}
            />
          </div>
          <div className="Row--flat">
            <input
              onChange={handlePlaylistNameChange}
              name="playlistDescription"
              id="playlistDescription"
              className="PDP__PlaylistDescriptionChangeInput"
              type="text"
              placeholder={playlist.playlistDescription}
              value={playlist.playlistDescription}
            />
          </div>
        </>
      )}

      <div className="Row--flat --accented --space-between">
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
      </div>

      {!addTracksMode ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tracks">
            {(provided) => (
              <ul
                className="DND__List"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderTracksFromPlaylist()}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        renderCollection()
      )}
    </section>
  );
}
