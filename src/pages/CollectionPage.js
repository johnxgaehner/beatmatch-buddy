import { useEffect, useState } from "react";
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
        if (
          element.trackTitle.toUpperCase().includes(searchFilter) ||
          element.artistName.toUpperCase().includes(searchFilter) ||
          element.recordTitle.toUpperCase().includes(searchFilter)
        ) {
          return true;
        }
        return false;
      });
      // search by bpm
      const tempoFilteredItems = searchFilteredItems.filter((element) => {
        if (+element.bpm > +minTempoFilter && +element.bpm < +maxTempoFilter) {
          return true;
        }
        return false;
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
    setMinTempoFilter(event.target.value);
  }

  function handleMaxTempoInput(event) {
    setMaxTempoFilter(event.target.value);
  }

  return (
    <section className="CollectionPage">
      {collection ? (
        <>
          <div className="CollectionPage__SearchFilter">
            <input
              onChange={handleSearchInput}
              type="text"
              name="SearchFilter"
              id="SearchFilter"
              placeholder="SEARCH:"
            />
          </div>
          <div className="CollectionPage__TempoFilter">
            <p>TEMPO:</p>
            <div className="CollectionPage__TempoFilterSection">
              <input
                onChange={handleMinTempoInput}
                type="text"
                name="TempoFilter__min"
                id="TempoFilter__min"
                placeholder="128"
              />
              <p>-</p>
              <input
                onChange={handleMaxTempoInput}
                type="text"
                name="TempoFilter__max"
                id="TempoFilter__max"
                placeholder="132"
              />
            </div>
          </div>
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
