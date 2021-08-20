import { useEffect } from "react";
import { useState } from "react";

import AddTrackOnTheFlyItem from "../components/AddTrackOnTheFlyItem";
import TrackItem from "../components/TrackItem";
import updatePlaylists from "../services/updatePlaylists";
import useLocalStorage from "../services/useLocalStorage";

export default function usePlaylistDetails(playlistId, history) {
  const [tracks] = useLocalStorage("savedTracks", []);
  const [playlists, setPlaylists] = useLocalStorage("savedPlaylists", []);

  const [playlist, setPlaylist] = useState();

  const [editMode, setEditMode] = useState(false);
  const [addTracks, setAddTracks] = useState(false);

  useEffect(() => {
    const requestedPlaylist = playlists.find((playlist) => {
      return playlist.id === playlistId;
    });
    setPlaylist(requestedPlaylist);
  }, [playlists, playlistId]);

  function renderTracks() {
    if (tracks && playlist) {
      if (playlist.trackIds.length === 0 || tracks.length === 0) {
        return <div className="Row--flat">NO TRACKS IN HERE YET...</div>;
      }
      const includedTracks = playlist.trackIds.map((trackId) => {
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
    if (confirmBox) {
      const playlistsWithoutCurrentPlaylist = playlists.filter((playlist) => {
        return playlist.id !== playlistId;
      });
      setPlaylists(playlistsWithoutCurrentPlaylist);
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

    !patchedTrackIds.includes(clickedTrackId)
      ? patchedTrackIds.push(clickedTrackId)
      : patchedTrackIds.splice(patchedTrackIds.indexOf(clickedTrackId), 1);

    const patchedPlaylist = { ...playlist, trackIds: patchedTrackIds };

    const updatedPlaylists = updatePlaylists(
      playlists,
      playlistId,
      patchedPlaylist
    );
    setPlaylists(updatedPlaylists);
  }

  // --- EDIT MODE

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

  function onRemoveClick(trackId) {
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
  return {
    renderTracks,
    playlist,
    handlePlaylistNameChange,
    editMode,
    addTracks,
    handleAddButton,
    handleDeleteButton,
    handleOnDragEnd,
    renderCollection,
    handleEditButton,
  };
}
