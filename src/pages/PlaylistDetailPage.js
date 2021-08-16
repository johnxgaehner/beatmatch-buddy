import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();

  const [tracks, setTracks] = useState();
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    const savedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    const savedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
    setTracks(savedTracks);
    setPlaylists(savedPlaylists);
  }, []);

  function renderTracks() {
    if (tracks && playlists) {
      const requestedPlaylist = playlists.filter((playlist) => {
        return playlist.id === playlistId;
      });
      const includedTracks = tracks.filter((track) => {
        return requestedPlaylist[0].trackIds.includes(track.id);
      });
      const trackItems = includedTracks.map((track) => {
        return <p>{track.id}</p>;
      });
      return trackItems;
    }
    return "loading";
  }

  return <>{renderTracks()}</>;
}
