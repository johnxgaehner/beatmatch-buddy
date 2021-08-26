import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddTrackOnTheFlyItem from "./AddTrackOnTheFlyItem";
import TrackItem from "./TrackItem";

export default function PlaylistContent({
  addTracksMode,
  handleOnDragEnd,
  playlistTrackIds,
  tracks,
  editMode,
  onAddToPlaylistClick,
  onDeleteTrackClick,
}) {
  function renderTracksFromPlaylist() {
    if (tracks && playlistTrackIds) {
      if (playlistTrackIds.length === 0 || tracks.length === 0) {
        return <div className="Row--flat">NO TRACKS IN HERE YET...</div>;
      }
      const includedTracks = playlistTrackIds.map((trackId) => {
        const includedTrack = tracks.find((element) => element.id === trackId);
        return includedTrack;
      });
      const trackItems = includedTracks.map((track, index) => {
        return (
          <TrackItem
            index={index}
            key={track.id}
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
          playlistTrackIds={playlistTrackIds}
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

PlaylistContent.propTypes = {
  addTracksMode: PropTypes.bool.isRequired,
  handleOnDragEnd: PropTypes.func.isRequired,
  playlistTrackIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      bpm: PropTypes.number,
      trackTitle: PropTypes.string,
      artistName: PropTypes.string,
      recordTitle: PropTypes.string,
    })
  ).isRequired,
  editMode: PropTypes.bool.isRequired,
  onAddToPlaylistClick: PropTypes.func.isRequired,
  onDeleteTrackClick: PropTypes.func.isRequired,
};
