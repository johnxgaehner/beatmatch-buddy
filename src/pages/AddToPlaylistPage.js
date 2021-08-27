import { Link, useHistory, useParams } from "react-router-dom";
import AddToPlaylistItem from "../components/AddToPlaylistItem";
import updatePlaylists from "../services/updatePlaylists";
import useLocalStorage from "../hooks/useLocalStorage";
import "./AddToPlaylistPage.css";

export default function AddToPlaylistPage() {
  const { id } = useParams();
  const history = useHistory();
  const [tracks, setTracks] = useLocalStorage("savedTracks", []);
  const [playlists, setPlaylists] = useLocalStorage("savedPlaylists", []);

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
    return <div className="Row--flat">NO PLAYLIST CREATED YET...</div>;
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
    const confirmation = window.confirm(
      "Do you really want to delete this track?"
    );
    if (confirmation) {
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
  }

  return (
    <section className="AddToPlaylistPage">
      <div onClick={handleDeleteTrackClick} className="ATPP__DeleteTrack">
        <p>DELETE TRACK</p>
      </div>
      <Link to="/create-new-playlist" className="Row--flat --accented">
        <p>CREATE NEW PLAYLIST</p>
      </Link>
      {renderAddToPlaylistItems()}
    </section>
  );
}
