import { useState } from "react";
import CollectionFilterSection from "../components/CollectionFilterSection";
import CollectionItem from "../components/CollectionItem";
import useLocalStorage from "../services/useLocalStorage";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [collection, setCollection] = useLocalStorage("savedTracks", []);
  const [searchFilter, setSearchFilter] = useState("");
  const [minTempoFilter, setMinTempoFilter] = useState(0);
  const [maxTempoFilter, setMaxTempoFilter] = useState(999);

  function renderCollectionItems() {
    if (collection && collection.length > 0) {
      const searchFilteredItems = collection.filter((element) => {
        return (
          element.trackTitle.toUpperCase().includes(searchFilter) ||
          element.artistName.toUpperCase().includes(searchFilter) ||
          element.recordTitle.toUpperCase().includes(searchFilter)
        );
      });
      const tempoFilteredItems = searchFilteredItems.filter((element) => {
        return +element.bpm >= minTempoFilter && +element.bpm <= maxTempoFilter;
      });
      const collectionItems = tempoFilteredItems.map((track) => {
        return <CollectionItem key={track.id} data={track} />;
      });
      if (collectionItems.length > 0) {
        return collectionItems;
      }
      return <div className="Row--flat">There's No Matching Track...</div>;
    }
  }

  function handleSearchInput(event) {
    setSearchFilter(event.target.value.toUpperCase());
  }

  function handleMinTempoInput(event) {
    setMinTempoFilter(+event.target.value);
  }

  function handleMaxTempoInput(event) {
    if (event.target.value === "") {
      return setMaxTempoFilter(999);
    }
    setMaxTempoFilter(+event.target.value);
  }

  return (
    <section className="CollectionPage">
      {collection.length > 0 ? (
        <>
          <CollectionFilterSection
            handleSearchInput={handleSearchInput}
            handleMinTempoInput={handleMinTempoInput}
            handleMaxTempoInput={handleMaxTempoInput}
          />
          {renderCollectionItems()}
        </>
      ) : (
        <div className="Row--flat">YOUR COLLECTION IS EMPTY</div>
      )}
    </section>
  );
}
