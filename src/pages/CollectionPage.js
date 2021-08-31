import { useState } from "react";
import CollectionFilterSection from "../components/CollectionFilterSection";
import CollectionItem from "../components/CollectionItem";
import getDemoCollection from "../demo/demoCollection";
import useLocalStorage from "../hooks/useLocalStorage";
import sortCollection from "../services/sortCollection";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [collection] = useLocalStorage("savedTracks", getDemoCollection());
  const [searchFilter, setSearchFilter] = useState("");
  const [currentSortValue, setCurrentSortValue] = useLocalStorage(
    "sortCollectionValue",
    "date_9to0"
  );
  const [minTempoFilter, setMinTempoFilter] = useState(0);
  const [maxTempoFilter, setMaxTempoFilter] = useState(999);

  function filterTracksByKeyword(track) {
    return (
      track.trackTitle.toUpperCase().includes(searchFilter) ||
      track.artistName.toUpperCase().includes(searchFilter) ||
      track.recordTitle.toUpperCase().includes(searchFilter)
    );
  }

  function filterTracksByTempo(track) {
    return track.bpm >= minTempoFilter && track.bpm <= maxTempoFilter;
  }

  function renderCollectionItems() {
    if (collection.length > 0) {
      const allTracks = [...collection];
      sortCollection(allTracks, currentSortValue);
      const collectionItems = allTracks
        .filter(filterTracksByKeyword)
        .filter(filterTracksByTempo)
        .map((track) => {
          return <CollectionItem key={track.id} trackInfo={track} />;
        });
      if (collectionItems.length > 0) {
        return collectionItems;
      }
      return <div className="Row--flat">There's No Matching Track...</div>;
    }
  }

  function onSearchInput(event) {
    setSearchFilter(event.target.value.toUpperCase());
  }

  function onMinTempoChange(event) {
    setMinTempoFilter(+event.target.value);
  }

  function onMaxTempoChange(event) {
    if (event.target.value === "") {
      return setMaxTempoFilter(999);
    }
    setMaxTempoFilter(+event.target.value);
  }

  function onSortValueSelection(selectedValue) {
    setCurrentSortValue(selectedValue);
  }

  return (
    <section className="CollectionPage">
      {collection.length > 0 ? (
        <>
          <CollectionFilterSection
            onSearchInput={onSearchInput}
            onMinTempoChange={onMinTempoChange}
            onMaxTempoChange={onMaxTempoChange}
            onSortValueSelection={onSortValueSelection}
            currentSortValue={currentSortValue}
          />
          {renderCollectionItems()}
        </>
      ) : (
        <div className="Row--flat">Your Collection Is Empty...</div>
      )}
    </section>
  );
}
