import AddTrackOnTheFlyItem from "./AddTrackOnTheFlyItem";
import TrackItem from "./TrackItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function PlaylistContent({
  addTracksMode,
  handleOnDragEnd,
  playlist,
  tracks,
  editMode,
  onAddToPlaylistClick,
  onDeleteTrackClick,
}) {
  function renderTracksFromPlaylist() {
    if (tracks && playlist) {
      if (playlist.trackIds.length === 0 || tracks.length === 0) {
        return <div className="Row--flat">NO TRACKS IN HERE YET...</div>;
      }
      const includedTracks = playlist.trackIds.map((trackId) => {
        const includedTrack = tracks.find((element) => element.id === trackId);
        return includedTrack;
      });
      const trackItems = includedTracks.map((track, index) => {
        return (
          <TrackItem
            key={track.id}
            index={index}
            trackInfo={track}
            editMode={editMode}
            onDeleteTrackClick={onDeleteTrackClick}
          />
        );
      });
      return trackItems;
    }
  }

  function renderCollection() {
    if (tracks.length === 0) {
      return <div className="Row--flat">YOUR COLLECTION IS EMPTY...</div>;
    }
    const addTrackOnTheFlyItems = tracks.map((track) => {
      return (
        <AddTrackOnTheFlyItem
          key={track.id}
          trackInfo={track}
          playlistTrackIds={playlist.trackIds}
          onAddToPlaylistClick={onAddToPlaylistClick}
        />
      );
    });
    return addTrackOnTheFlyItems;
  }

  return (
    <div>
      {!addTracksMode ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tracks">
            {(provided) => (
              <ul
                className="DND__List"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderTracksFromPlaylist()}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        renderCollection()
      )}
    </div>
  );
}
