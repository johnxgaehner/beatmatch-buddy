import AddTrackOnTheFlyItem from "../components/AddTrackOnTheFlyItem";

export default function getRenderedAddTracksOnTheFlyItems(
  filteredAddTrackOnTheFlyItems,
  playlistTrackIds,
  onAddToPlaylistClick
) {
  return filteredAddTrackOnTheFlyItems.map((track, index) => {
    if (
      window.innerWidth >= 700 &&
      window.innerWidth < 1050 &&
      filteredAddTrackOnTheFlyItems.length % 2 === 1
    ) {
      if (index < filteredAddTrackOnTheFlyItems.length - 1) {
        return (
          <AddTrackOnTheFlyItem
            key={track.id}
            trackInfo={track}
            playlistTrackIds={playlistTrackIds}
            onAddToPlaylistClick={onAddToPlaylistClick}
            className="AddTrackOnTheFlyItem"
          />
        );
      }
      return (
        <AddTrackOnTheFlyItem
          key={track.id}
          trackInfo={track}
          playlistTrackIds={playlistTrackIds}
          onAddToPlaylistClick={onAddToPlaylistClick}
          className="AddTrackOnTheFlyItem --lastATOTFI"
        />
      );
    } else if (
      window.innerWidth >= 1050 &&
      filteredAddTrackOnTheFlyItems.length % 3 !== 0
    ) {
      if (index < filteredAddTrackOnTheFlyItems.length - 1) {
        return (
          <AddTrackOnTheFlyItem
            key={track.id}
            trackInfo={track}
            playlistTrackIds={playlistTrackIds}
            onAddToPlaylistClick={onAddToPlaylistClick}
            className="AddTrackOnTheFlyItem"
          />
        );
      }
      return (
        <AddTrackOnTheFlyItem
          key={track.id}
          trackInfo={track}
          playlistTrackIds={playlistTrackIds}
          onAddToPlaylistClick={onAddToPlaylistClick}
          className="AddTrackOnTheFlyItem --lastATOTFI"
        />
      );
    }

    return (
      <AddTrackOnTheFlyItem
        key={track.id}
        trackInfo={track}
        playlistTrackIds={playlistTrackIds}
        onAddToPlaylistClick={onAddToPlaylistClick}
        className="AddTrackOnTheFlyItem"
      />
    );
  });
}
