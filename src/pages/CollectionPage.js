import { useState } from "react";
import CollectionFilterSection from "../components/CollectionFilterSection";
import CollectionItem from "../components/CollectionItem";
import useLocalStorage from "../hooks/useLocalStorage";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [collection] = useLocalStorage("savedTracks", []);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentSortValue, setCurrentSortValue] = useLocalStorage(
    "sortCollectionValue",
    "date_9to0"
  );
  const [minTempoFilter, setMinTempoFilter] = useState(0);
  const [maxTempoFilter, setMaxTempoFilter] = useState(999);

  function renderCollectionItems() {
    if (collection && collection.length > 0) {
      const sortedCollectionItems = collection.sort(function (a, b) {
        switch (currentSortValue) {
          case "trackTitle_AtoZ":
            return a.trackTitle.toUpperCase() > b.trackTitle.toUpperCase()
              ? 1
              : -1;
          case "trackTitle_ZtoA":
            return a.trackTitle.toUpperCase() < b.trackTitle.toUpperCase()
              ? 1
              : -1;
          case "artistName_AtoZ":
            return a.artistName.toUpperCase() > b.artistName.toUpperCase()
              ? 1
              : -1;
          case "artistName_ZtoA":
            return a.artistName.toUpperCase() < b.artistName.toUpperCase()
              ? 1
              : -1;
          case "recordTitle_AtoZ":
            return a.recordTitle.toUpperCase() > b.recordTitle.toUpperCase()
              ? 1
              : -1;
          case "recordTitle_ZtoA":
            return a.recordTitle.toUpperCase() < b.recordTitle.toUpperCase()
              ? 1
              : -1;
          case "bpm_0to9":
            return a.bpm - b.bpm;
          case "bpm_9to0":
            return b.bpm - a.bpm;
          case "date_0to9":
            return new Date(a.createdAt) - new Date(b.createdAt);
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });

      const collectionItems = sortedCollectionItems
        .filter((track) => {
          return (
            track.trackTitle.toUpperCase().includes(searchFilter) ||
            track.artistName.toUpperCase().includes(searchFilter) ||
            track.recordTitle.toUpperCase().includes(searchFilter)
          );
        })
        .filter((track) => {
          return track.bpm >= minTempoFilter && track.bpm <= maxTempoFilter;
        })
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
        <div className="Row--flat">YOUR COLLECTION IS EMPTY</div>
      )}
    </section>
  );
}
