import CollectionItem from "../components/CollectionItem";
import "./CollectionPage.css";

export default function CollectionPage() {
  return (
    <section className="CollectionPage">
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
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
      <CollectionItem />
    </section>
  );
}
