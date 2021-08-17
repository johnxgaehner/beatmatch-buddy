import { useEffect, useState } from "react";
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
      const includedTracks = tracks.filter((track) => {
        return playlist[0].trackIds.includes(track.id);
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
    console.log(playlist);
    const playlistsWithoutClickedPlaylist = playlists.filter((playlist) => {
      return playlist.id !== playlistId;
    });
    console.log(playlistsWithoutClickedPlaylist);

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

    console.log(patchedPlaylist);
    setUpdate(!update);
  }

  return (
    <section>
      <div className="Row--flat --accented">
        {playlist ? playlist[0].playlistDescription : "loading description"}
      </div>
      <div className="Row--flat --accented --space-between">
        <button>Add Songs</button>
        <button onClick={handleEditButton}>
          {!editMode ? "Edit List" : "Done"}
        </button>
      </div>
      {renderTracks()}
    </section>
  );
}
