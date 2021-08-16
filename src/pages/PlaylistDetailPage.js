import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrackItem from "../components/TrackItem";

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();

  const [tracks, setTracks] = useState();
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    const savedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    const savedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
    const requestedPlaylist = savedPlaylists.filter((playlist) => {
      return playlist.id === playlistId;
    });
    setTracks(savedTracks);
    setPlaylist(requestedPlaylist);
    console.log(requestedPlaylist);
  }, [playlistId]);

  function renderTracks() {
    if (tracks && playlist) {
      const includedTracks = tracks.filter((track) => {
        return playlist[0].trackIds.includes(track.id);
      });
      if (includedTracks.length === 0) {
        return <div className="Row--flat">NO TRACKS IN HERE YET...</div>;
      }
      const trackItems = includedTracks.map((track, index) => {
        return <TrackItem key={track.id} index={index} data={track} />;
      });
      return trackItems;
    }
  }

  return (
    <section>
      <div className="Row--flat --accented">
        {playlist ? playlist[0].playlistDescription : "no"}
      </div>
      {renderTracks()}
    </section>
  );
}
