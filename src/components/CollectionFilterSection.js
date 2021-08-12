import "./CollectionFilterSection.css";

export default function CollectionFilterSection({
  handleSearchInput,
  handleMinTempoInput,
  handleMaxTempoInput,
}) {
  function handleSearch(event) {
    handleSearchInput(event);
  }

  function handleMinTempo(event) {
    handleMinTempoInput(event);
  }

  function handleMaxTempo(event) {
    handleMaxTempoInput(event);
  }

  return (
    <>
      <div className="CollectionPage__SearchFilter">
        <input
          onChange={handleSearch}
          type="text"
          name="SearchFilter"
          id="SearchFilter"
          placeholder="SEARCH:"
        />
      </div>
      <div className="CollectionPage__TempoFilter">
        <label htmlFor="TempoFilter__min">TEMPO:</label>
        <div className="CollectionPage__TempoFilterSection">
          <input
            onChange={handleMinTempo}
            type="text"
            name="TempoFilter__min"
            id="TempoFilter__min"
            maxLength="3"
            placeholder="MIN"
          />
          <p>-</p>
          <input
            onChange={handleMaxTempo}
            type="text"
            name="TempoFilter__max"
            id="TempoFilter__max"
            maxLength="3"
            placeholder="MAX"
          />
        </div>
      </div>
    </>
  );
}
