import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TrackItem from "./TrackItem";
import AddTrackOnTheFlyItem from "./AddTrackOnTheFlyItem";
import getTracksFromPlaylist from "../services/getTracksFromPlaylist";
import sortCollection from "../services/sortCollection";
import useLocalStorage from "../hooks/useLocalStorage";
import "./PlaylistContent.css";

export default function PlaylistContent({
  addTracksMode,
  handleOnDragEnd,
  playlistTrackIds,
  trackCollection,
  editMode,
  onAddToPlaylistClick,
  onDeleteTrackClick,
  searchFilter,
}) {
  const [currentSortValue] = useLocalStorage(
    "sortCollectionValue",
    "date_9to0"
  );

  function filterTracksByKeyword(track) {
    return (
      track.trackTitle.toUpperCase().includes(searchFilter) ||
      track.artistName.toUpperCase().includes(searchFilter) ||
      track.recordTitle.toUpperCase().includes(searchFilter)
    );
  }

  function renderTracksFromPlaylist() {
    if (playlistTrackIds.length > 0) {
      const includedTracks = getTracksFromPlaylist(
        playlistTrackIds,
        trackCollection
      );
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
    return <div className="Row--flat">No Tracks In Here Yet...</div>;
  }

  function renderCollection() {
    if (trackCollection.length > 0) {
      const allTracks = [...trackCollection];
      sortCollection(allTracks, currentSortValue);
      const addTrackOnTheFlyItems = allTracks
        .filter(filterTracksByKeyword)
        .map((track) => {
          return (
            <AddTrackOnTheFlyItem
              key={track.id}
              trackInfo={track}
              playlistTrackIds={playlistTrackIds}
              onAddToPlaylistClick={onAddToPlaylistClick}
            />
          );
        });
      if (addTrackOnTheFlyItems.length > 0) {
        return addTrackOnTheFlyItems;
      }
      return <div className="Row--flat">There's No Matching Track...</div>;
    }
    return <div className="Row--flat">Your Collection Is Empty...</div>;
  }

  return (
    <div>
      {!addTracksMode ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tracks">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {renderTracksFromPlaylist()}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="PlaylistContent_CollectionContainer">
          {renderCollection()}
        </div>
      )}
    </div>
  );
}

PlaylistContent.propTypes = {
  addTracksMode: PropTypes.bool.isRequired,
  handleOnDragEnd: PropTypes.func.isRequired,
  playlistTrackIds: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  trackCollection: PropTypes.arrayOf(
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
  searchFilter: PropTypes.string.isRequired,
};
