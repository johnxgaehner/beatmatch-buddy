import { useState } from "react";
import CollectionFilterSection from "../components/CollectionFilterSection";
import CollectionItem from "../components/CollectionItem";
import useLocalStorage from "../hooks/useLocalStorage";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [collection] = useLocalStorage("savedTracks", []);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState("trackTitle_AtoZ");
  const [minTempoFilter, setMinTempoFilter] = useState(0);
  const [maxTempoFilter, setMaxTempoFilter] = useState(999);

  function renderCollectionItems() {
    if (collection && collection.length > 0) {
      const sortedCollectionItems = collection.sort(function (a, b) {
        if (sortBy === "trackTitle_AtoZ") {
          return a.trackTitle.toUpperCase() > b.trackTitle.toUpperCase();
        } else if (sortBy === "trackTitle_ZtoA") {
          return a.trackTitle.toUpperCase() < b.trackTitle.toUpperCase();
        } else if (sortBy === "artistName_AtoZ") {
          return a.artistName.toUpperCase() > b.artistName.toUpperCase();
        } else if (sortBy === "artistName_ZtoA") {
          return a.artistName.toUpperCase() < b.artistName.toUpperCase();
        } else if (sortBy === "recordTitle_AtoZ") {
          return a.recordTitle.toUpperCase() > b.recordTitle.toUpperCase();
        } else if (sortBy === "recordTitle_ZtoA") {
          return a.recordTitle.toUpperCase() < b.recordTitle.toUpperCase();
        } else if (sortBy === "bpm_0to9") {
          return a.bpm - b.bpm;
        } else if (sortBy === "bpm_9to0") {
          return b.bpm - a.bpm;
        } else if (sortBy === "date_0to9") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
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
          return <CollectionItem key={track.id} data={track} />;
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

  function onSortButtonClick(sortId) {
    setSortBy(sortId);
  }

  return (
    <section className="CollectionPage">
      {collection.length > 0 ? (
        <>
          <CollectionFilterSection
            onSearchInput={onSearchInput}
            onMinTempoChange={onMinTempoChange}
            onMaxTempoChange={onMaxTempoChange}
            onSortButtonClick={onSortButtonClick}
          />
          {renderCollectionItems()}
        </>
      ) : (
        <div className="Row--flat">YOUR COLLECTION IS EMPTY</div>
      )}
    </section>
  );
}
