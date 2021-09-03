import CollectionItem from "../components/CollectionItem";

export default function getRenderedCollectionItems(filteredCollectionItems) {
  return filteredCollectionItems.map((track, index) => {
    if (
      window.innerWidth >= 700 &&
      window.innerWidth < 1050 &&
      filteredCollectionItems.length % 2 === 1
    ) {
      if (index < filteredCollectionItems.length - 1) {
        return (
          <CollectionItem
            key={track.id}
            trackInfo={track}
            className="CollectionItem"
          />
        );
      }
      return (
        <CollectionItem
          key={track.id}
          trackInfo={track}
          className="CollectionItem --last"
        />
      );
    } else if (
      window.innerWidth >= 1050 &&
      filteredCollectionItems.length % 3 !== 0
    ) {
      if (index < filteredCollectionItems.length - 1) {
        return (
          <CollectionItem
            key={track.id}
            trackInfo={track}
            className="CollectionItem"
          />
        );
      }
      return (
        <CollectionItem
          key={track.id}
          trackInfo={track}
          className="CollectionItem --last"
        />
      );
    }
    return (
      <CollectionItem
        key={track.id}
        trackInfo={track}
        className="CollectionItem"
      />
    );
  });
}
