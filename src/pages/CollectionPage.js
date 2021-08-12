import { useEffect, useState } from "react";
import CollectionItem from "../components/CollectionItem";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [collection, setCollection] = useState();
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    setCollection(storedTracks);
  }, []);

  // CAN I MAKE THIS MORE BEAUTIFUL?!
  function renderCollectionItems() {
    if (collection) {
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

      const collectionItems = searchFilteredItems.map((track) => {
        return <CollectionItem key={track.id} data={track} />;
      });
      return collectionItems;
    }
  }

  function handleSearchInput(event) {
    setSearchFilter(event.target.value.toUpperCase());
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
                type="text"
                name="TempoFilter__min"
                id="TempoFilter__min"
                placeholder="128"
              />
              <p>-</p>
              <input
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
