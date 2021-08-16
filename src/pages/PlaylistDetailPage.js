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

  return <p>{playlistId}</p>;
}
