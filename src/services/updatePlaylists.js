// This function merges the patched playlist with all playlists
// and returns the updated playlist collection array

export default function updatePlaylists(
  allPlaylists,
  playlistId,
  patchedPlaylist
) {
  const playlistsWithoutCurrentPlaylist = allPlaylists.filter((playlist) => {
    return playlist.id !== playlistId;
  });

  const patchedPlaylistCollection = [
    ...playlistsWithoutCurrentPlaylist,
    patchedPlaylist,
  ];

  return patchedPlaylistCollection;
}
