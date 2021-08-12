import { useEffect, useState } from "react";
import CollectionFilterSection from "../components/CollectionFilterSection";
import CollectionItem from "../components/CollectionItem";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [collection, setCollection] = useState();
  const [searchFilter, setSearchFilter] = useState("");
  const [minTempoFilter, setMinTempoFilter] = useState(0);
  const [maxTempoFilter, setMaxTempoFilter] = useState(999);

  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    setCollection(storedTracks);
  }, []);

  function renderCollectionItems() {
    if (collection) {
      // search by artist, title & record
      const searchFilteredItems = collection.filter((element) => {
        return (
          element.trackTitle.toUpperCase().includes(searchFilter) ||
          element.artistName.toUpperCase().includes(searchFilter) ||
          element.recordTitle.toUpperCase().includes(searchFilter)
        );
      });
      // filter by bpm
      const tempoFilteredItems = searchFilteredItems.filter((element) => {
        return +element.bpm >= minTempoFilter && +element.bpm <= maxTempoFilter;
      });
      // render filtered collection items
      const collectionItems = tempoFilteredItems.map((track) => {
        return <CollectionItem key={track.id} data={track} />;
      });
      return collectionItems;
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
      {collection ? (
        <>
          <CollectionFilterSection
            handleSearchInput={handleSearchInput}
            handleMinTempoInput={handleMinTempoInput}
            handleMaxTempoInput={handleMaxTempoInput}
          />
          {renderCollectionItems()}
        </>
      ) : (
        <div className="CollectionPage__EmptyCollection">
          YOUR COLLECTION IS EMPTY
        </div>
      )}
    </section>
  );
}
