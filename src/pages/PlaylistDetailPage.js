import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import TrackItem from "../components/TrackItem";

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();

  const [tracks, setTracks] = useState();
  const [playlists, setPlaylists] = useState();
  const [playlist, setPlaylist] = useState();

  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    const savedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    const savedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
    const requestedPlaylist = savedPlaylists.filter((playlist) => {
      return playlist.id === playlistId;
    });
    setTracks(savedTracks);
    setPlaylists(savedPlaylists);
    setPlaylist(requestedPlaylist);
  }, [playlistId, update]);

  function renderTracks() {
    if (tracks && playlist) {
      const includedTracks = playlist[0].trackIds.map((trackId) => {
        const found = tracks.find((element) => element.id === trackId);
        return found;
      });

      if (includedTracks.length === 0) {
        return <div className="Row--flat">NO TRACKS IN HERE YET...</div>;
      }
      const trackItems = includedTracks.map((track, index) => {
        return (
          <TrackItem
            key={track.id}
            index={index}
            data={track}
            editMode={editMode}
            onRemoveClick={onRemoveClick}
          />
        );
      });
      return trackItems;
    }
  }

  function handleEditButton() {
    setEditMode(!editMode);
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

    localStorage.setItem(
      "savedPlaylists",
      JSON.stringify(patchedPlaylistCollection)
    );

    setUpdate(!update);
  }

  function handleOnDragEnd(result) {
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

    localStorage.setItem(
      "savedPlaylists",
      JSON.stringify(patchedPlaylistCollection)
    );

    setUpdate(!update);
  }

  return (
    <section>
      <div className="Row--flat --accented">
        {playlist ? playlist[0].playlistDescription : "loading description"}
      </div>
      <div className="Row--flat --accented --space-between">
        <button>(Add Songs)</button>
        <button onClick={handleEditButton}>
          {!editMode ? "Edit List" : "Done"}
        </button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tracks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {renderTracks()}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
