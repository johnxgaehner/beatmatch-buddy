import { useEffect, useState } from "react";
import CollectionItem from "../components/CollectionItem";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [collection, setCollection] = useState();

  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem("savedTracks"));
    setCollection(storedTracks);
  }, []);

  function renderCollectionItems() {
    if (collection) {
      const collectionItems = collection.map((track) => {
        return <CollectionItem key={track.id} data={track} />;
      });
      return collectionItems;
    }
  }

  return (
    <section className="CollectionPage">
      {collection ? (
        <>
          <div className="CollectionPage__SearchFilter">
            <input
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
        <div className="CollectionPage__Empty-Collection">
          YOUR COLLECTION IS EMPTY
        </div>
      )}
    </section>
  );
}
