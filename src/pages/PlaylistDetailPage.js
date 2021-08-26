import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import PlaylistHeader from "../components/PlaylistHeader";
import PlaylistToolbar from "../components/PlaylistToolbar";
import PlaylistContent from "../components/PlaylistContent";

import useScroll from "../hooks/useScroll";
import useLocalStorage from "../hooks/useLocalStorage";
import updatePlaylists from "../services/updatePlaylists";

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();
  const history = useHistory();

  const [tracks] = useLocalStorage("savedTracks", []);
  const [playlists, setPlaylists] = useLocalStorage("savedPlaylists", []);
  const [playlist, setPlaylist] = useState();

  const [editMode, setEditMode] = useState(false);
  const [addTracksMode, setAddTracksMode] = useState(false);

  const [headerIsHidden, setHeaderIsHidden] = useState(false);
  const MIN_SCROLL = 63;
  const TIMEOUT_DELAY = 300;

  useScroll((callbackData) => {
    const { previousScrollTop, currentScrollTop } = callbackData;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MIN_SCROLL;
    setTimeout(() => {
      setHeaderIsHidden(isScrolledDown && isMinimumScrolled);
    }, TIMEOUT_DELAY);
  });

  useEffect(() => {
    const requestedPlaylist = playlists.find((playlist) => {
      return playlist.id === playlistId;
    });
    setPlaylist(requestedPlaylist);
  }, [playlists, playlistId]);

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

  function onPlaylistNameChange(event) {
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

  function onDeletePlaylistClick() {
    const confirmation = window.confirm(
      "Do you really want to delete this playlist?"
    );
    if (confirmation) {
      const playlistsWithoutDeletedPlaylist = playlists.filter((playlist) => {
        return playlist.id !== playlistId;
      });
      setPlaylists(playlistsWithoutDeletedPlaylist);
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
      {playlist && (
        <PlaylistHeader
          editMode={editMode}
          headerIsHidden={headerIsHidden}
          playlistName={playlist.playlistName}
          playlistDescription={playlist.playlistDescription}
          onPlaylistNameChange={onPlaylistNameChange}
        />
      )}

      <PlaylistToolbar
        editMode={editMode}
        setEditMode={setEditMode}
        addTracksMode={addTracksMode}
        setAddTracksMode={setAddTracksMode}
        onDeletePlaylistClick={onDeletePlaylistClick}
      />

      {playlist && tracks && (
        <PlaylistContent
          addTracksMode={addTracksMode}
          handleOnDragEnd={handleOnDragEnd}
          playlistTrackIds={playlist.trackIds}
          trackCollection={tracks}
          editMode={editMode}
          onAddToPlaylistClick={onAddToPlaylistClick}
          onDeleteTrackClick={onDeleteTrackClick}
        />
      )}
    </section>
  );
}
