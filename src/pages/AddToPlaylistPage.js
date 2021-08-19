import { Link, useHistory, useParams } from "react-router-dom";
import AddToPlaylistItem from "../components/AddToPlaylistItem";
import updatePlaylists from "../services/updatePlaylists";
import useLocalStorage from "../services/useLocalStorage";

import "./AddToPlaylistPage.css";

export default function AddToPlaylistPage() {
  const { id } = useParams();
  const [playlists, setPlaylists] = useLocalStorage("savedPlaylists", []);
  const [tracks, setTracks] = useLocalStorage("savedTracks", []);

  const history = useHistory();

  function renderAddToPlaylistItems() {
    if (playlists && playlists.length > 0) {
      const playlistItems = playlists
        .sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        })
        .map((playlist) => {
          return (
            <AddToPlaylistItem
              onAddToPlaylistClick={onAddToPlaylistClick}
              key={playlist.id}
              data={playlist}
              trackId={id}
            />
          );
        });
      return playlistItems;
    }
    return <div className="Row--flat">NO PLAYLIST CREATED YET...</div>;
  }

  function onAddToPlaylistClick(clickedPlaylistId) {
    const clickedPlaylistInArray = playlists.filter((playlist) => {
      return playlist.id === clickedPlaylistId;
    });

    const clickedPlaylist = clickedPlaylistInArray[0];

    const patchedTrackIds = [...clickedPlaylist.trackIds];

    !patchedTrackIds.includes(id)
      ? patchedTrackIds.push(id)
      : patchedTrackIds.splice(patchedTrackIds.indexOf(id), 1);

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

  function onDeleteTrackClick() {
    const confirmBox = window.confirm(
      "Do you really want to delete this track?"
    );
    if (confirmBox) {
      const collection = [...tracks];
      const patchedCollection = collection.filter((track) => {
        return track.id !== id;
      });
      setTracks(patchedCollection);
      history.goBack();
    }
  }

  return (
    <section className="AddToPlaylistPage">
      <div onClick={onDeleteTrackClick} className="ATPP__DeleteTrack">
        <p>DELETE TRACK</p>
      </div>
      <Link to="/create-new-playlist" className="Row--flat --accented">
        <p>CREATE NEW PLAYLIST</p>
      </Link>

      {renderAddToPlaylistItems()}
    </section>
  );
}
