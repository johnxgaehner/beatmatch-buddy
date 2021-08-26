export default function getTracksFromPlaylist(trackIds, collection) {
  return trackIds.map((trackId) => {
    const includedTrack = collection.find((element) => element.id === trackId);
    return includedTrack;
  });
}
