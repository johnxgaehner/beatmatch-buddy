import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useHistory, useParams } from "react-router-dom";

import AddTrackOnTheFlyItem from "../components/AddTrackOnTheFlyItem";
import TrackItem from "../components/TrackItem";
import useLocalStorage from "../services/useLocalStorage";

import "./PlaylistDetailPage.css";

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();

  const [tracks] = useLocalStorage("savedTracks", []);
  const [playlists, setPlaylists] = useLocalStorage("savedPlaylists", []);

  const [playlist, setPlaylist] = useState();

  const [editMode, setEditMode] = useState(false);
  const [addTracks, setAddTracks] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const requestedPlaylist = playlists.filter((playlist) => {
      return playlist.id === playlistId;
    });
    setPlaylist(requestedPlaylist);
  }, [playlists, playlistId]);

  function renderTracks() {
    if (tracks && playlist) {
      if (playlist[0].trackIds.length === 0) {
        return <div className="Row--flat">NO TRACKS IN HERE YET...</div>;
      }
      const includedTracks = playlist[0].trackIds.map((trackId) => {
        const found = tracks.find((element) => element.id === trackId);
        return found;
      });
      const trackItems = includedTracks.map((track, index) => {
        return (
          <TrackItem
            key={track.id}
            index={index}
            trackInfo={track}
            editMode={editMode}
            onRemoveClick={onRemoveClick}
          />
        );
      });
      return trackItems;
    }
  }

  // --- DELETE PLAYLIST
  function handleDeleteButton() {
    const confirmBox = window.confirm(
      "Do you really want to delete this playlist?"
    );
    if (confirmBox === true) {
      const playlistsWithoutClickedPlaylist = playlists.filter((playlist) => {
        return playlist.id !== playlistId;
      });
      setPlaylists(playlistsWithoutClickedPlaylist);
      history.goBack();
    }
  }

  // --- ENTER EDIT MODES
  function handleEditButton() {
    setEditMode(!editMode);
  }

  function handleAddButton() {
    setAddTracks(!addTracks);
  }

  // --- ADD TRACKS MODE
  function renderCollection() {
    const addTrackOnTheFlyItems = tracks.map((track) => {
      return (
        <AddTrackOnTheFlyItem
          key={track.id}
          trackInfo={track}
          playlist={playlist[0]}
          onAddToPlaylistClick={onAddToPlaylistClick}
        />
      );
    });
    return addTrackOnTheFlyItems;
  }

  function onAddToPlaylistClick(clickedTrackId) {
    const patchedTrackIds = [...playlist[0].trackIds];

    !patchedTrackIds.includes(clickedTrackId)
      ? patchedTrackIds.push(clickedTrackId)
      : patchedTrackIds.splice(patchedTrackIds.indexOf(clickedTrackId), 1);

    const patchedPlaylist = { ...playlist[0], trackIds: patchedTrackIds };

    const playlistsWithoutClickedPlaylist = playlists.filter((playlist) => {
      return playlist.id !== playlistId;
    });

    const patchedPlaylistCollection = [
      ...playlistsWithoutClickedPlaylist,
      patchedPlaylist,
    ];

    setPlaylists(patchedPlaylistCollection);
  }

  // --- EDIT MODE

  function handlePlaylistNameChange(event) {
    const input = event.target;
    const value = input.value;
    const key = input.name;
    const playlistsWithoutClickedPlaylist = playlists.filter((playlist) => {
      return playlist.id !== playlistId;
    });
    const patchedPlaylist = { ...playlist[0], [key]: value };
    const patchedPlaylistCollection = [
      ...playlistsWithoutClickedPlaylist,
      patchedPlaylist,
    ];

    setPlaylists(patchedPlaylistCollection);
  }

  function onRemoveClick(trackId) {
    const playlistsWithoutClickedPlaylist = playlists.filter((playlist) => {
      return playlist.id !== playlistId;
    });

    const newTrackIds = [...playlist[0].trackIds];
    newTrackIds.splice(newTrackIds.indexOf(trackId), 1);

    const patchedPlaylist = { ...playlist[0], trackIds: newTrackIds };

    const patchedPlaylistCollection = [
      ...playlistsWithoutClickedPlaylist,
      patchedPlaylist,
    ];

    setPlaylists(patchedPlaylistCollection);
  }

  function handleOnDragEnd(result) {
    if (result.destination) {
      const trackOrder = [...playlist[0].trackIds];
      const [reorderedTracks] = trackOrder.splice(result.source.index, 1);
      trackOrder.splice(result.destination.index, 0, reorderedTracks);

      const playlistsWithoutClickedPlaylist = playlists.filter((playlist) => {
        return playlist.id !== playlistId;
      });

      const patchedPlaylist = { ...playlist[0], trackIds: trackOrder };

      const patchedPlaylistCollection = [
        ...playlistsWithoutClickedPlaylist,
        patchedPlaylist,
      ];

      setPlaylists(patchedPlaylistCollection);
    }
  }

  return (
    <section>
      {playlist ? (
        !editMode ? (
          <>
            <h1 className="PDP__PlaylistName">{playlist[0].playlistName}</h1>
            <div className="Row--flat --accented">
              {playlist[0].playlistDescription}
            </div>
          </>
        ) : (
          <>
            <input
              onChange={handlePlaylistNameChange}
              name="playlistName"
              id="playlistName"
              className="PDP__PlaylistName--edit"
              type="text"
              placeholder={playlist[0].playlistName}
              value={playlist[0].playlistName}
            />
            <input
              onChange={handlePlaylistNameChange}
              name="playlistDescription"
              id="playlistDescription"
              className="PDP__PlaylistNameChangeInput"
              type="text"
              placeholder={playlist[0].playlistDescription}
              value={playlist[0].playlistDescription}
            />
          </>
        )
      ) : (
        <p>loading...</p>
      )}

      <div className="Row--flat --accented --space-between">
        {!editMode ? (
          <button onClick={handleAddButton}>
            {!addTracks ? "Add Tracks" : "Done"}
          </button>
        ) : (
          <button onClick={handleDeleteButton} className="PDP__DeleteButton">
            Delete Playlist
          </button>
        )}

        {!addTracks && (
          <button onClick={handleEditButton}>
            {!editMode ? "Edit List" : "Done"}
          </button>
        )}
      </div>

      {!addTracks ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tracks">
            {(provided) => (
              <ul
                className="DND__List"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderTracks()}
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
