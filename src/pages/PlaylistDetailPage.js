import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();

  return <p>{playlistId}</p>;
}
