import { useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AddToPlaylistItem from "../components/AddToPlaylistItem";
import updatePlaylists from "../services/updatePlaylists";
import useLocalStorage from "../hooks/useLocalStorage";
import "./AddToPlaylistPage.css";
import ConfirmModal from "../components/ConfirmModal";
import useOutsideClick from "../hooks/useOutsideClick";
import getDemoCollection from "../demo/demoCollection";
import getDemoPlaylists from "../demo/demoPlaylists";

export default function AddToPlaylistPage() {
  const { id } = useParams();
  const history = useHistory();
  const [tracks, setTracks] = useLocalStorage(
    "savedTracks",
    getDemoCollection()
  );
  const [playlists, setPlaylists] = useLocalStorage(
    "savedPlaylists",
    getDemoPlaylists()
  );

  const confirmModalRef = useRef();
  const [confirmIsOpen, setConfirmIsOpen] = useOutsideClick(
    confirmModalRef,
    false
  );

  function renderAddToPlaylistItems() {
    if (playlists.length > 0) {
      const playlistItems = [...playlists];
      return playlistItems
        .sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        })
        .map((playlist) => {
          return (
            <AddToPlaylistItem
              key={playlist.id}
              trackId={id}
              playlistInfo={playlist}
              onAddToPlaylistClick={onAddToPlaylistClick}
            />
          );
        });
    }
    return <div className="Row--flat">No Playlist Created Yet...</div>;
  }

  function onAddToPlaylistClick(clickedPlaylistId) {
    const clickedPlaylist = playlists.find((playlist) => {
      return playlist.id === clickedPlaylistId;
    });

    const patchedTrackIds = [...clickedPlaylist.trackIds];
    patchedTrackIds.includes(id)
      ? patchedTrackIds.splice(patchedTrackIds.indexOf(id), 1)
      : patchedTrackIds.push(id);

    const patchedPlaylist = {
      ...clickedPlaylist,
      trackIds: patchedTrackIds,
    };

    const updatedPlaylists = updatePlaylists(
      playlists,
      clickedPlaylist.id,
      patchedPlaylist
    );

    setPlaylists(updatedPlaylists);
  }

  function handleDeleteTrackClick() {
    setConfirmIsOpen(true);
  }

  function onDeleteTrackClick() {
    const patchedTrackCollection = tracks.filter((track) => {
      return track.id !== id;
    });
    setTracks(patchedTrackCollection);

    const patchedPlaylistCollection = [...playlists];
    patchedPlaylistCollection.forEach((playlist) => {
      if (playlist.trackIds.includes(id)) {
        playlist.trackIds.splice(playlist.trackIds.indexOf(id), 1);
      }
    });
    setPlaylists(patchedPlaylistCollection);

    history.goBack();
  }

  return (
    <>
      <section className="AddToPlaylistPage">
        <div onClick={handleDeleteTrackClick} className="ATPP__DeleteTrack">
          <p>DELETE TRACK</p>
        </div>
        <Link to="/create-new-playlist" className="Row--flat --accented">
          <p>CREATE NEW PLAYLIST</p>
        </Link>
        {renderAddToPlaylistItems()}
      </section>
      {confirmIsOpen && (
        <div ref={confirmModalRef}>
          <ConfirmModal
            text="track"
            setConfirmIsOpen={setConfirmIsOpen}
            onConfirmation={onDeleteTrackClick}
          />
        </div>
      )}
    </>
  );
}
