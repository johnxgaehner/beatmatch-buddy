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
      <div className="Row--flat">
        <input
          onChange={handleSearch}
          type="text"
          name="SearchFilter"
          id="SearchFilter"
          placeholder="SEARCH:"
        />
      </div>
      <div className="Row--flat --space-between">
        <label htmlFor="TempoFilter__min">TEMPO:</label>
        <div className="CollectionPage__TempoFilterSection">
          <input
            onChange={handleMinTempo}
            type="text"
            name="TempoFilter__min"
            id="TempoFilter__min"
            maxLength="3"
            placeholder="MIN"
            inputMode="numeric"
          />
          <p>-</p>
          <input
            onChange={handleMaxTempo}
            type="text"
            name="TempoFilter__max"
            id="TempoFilter__max"
            maxLength="3"
            placeholder="MAX"
            inputMode="numeric"
          />
        </div>
      </div>
    </>
  );
}
