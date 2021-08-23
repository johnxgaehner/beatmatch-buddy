import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import SortCollectionByItem from "./SortCollectionByItem";
import { ReactComponent as ArrowIcon } from "../assets/icon_arrow.svg";
import "./CollectionFilterSection.css";

export default function CollectionFilterSection({
  onSearchInput,
  onMinTempoChange,
  onMaxTempoChange,
  onSortButtonClick,
  sortByValue,
}) {
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useOutsideClick(dropdownRef, false);

  function handleSearchInput(event) {
    onSearchInput(event);
  }

  function handleDropDownButtonClick() {
    setDropdown(!dropdown);
  }

  function handleSortButtonClick(event) {
    onSortButtonClick(event.target.id);
    setDropdown(!dropdown);
  }

  function handleMinTempoChange(event) {
    onMinTempoChange(event);
  }

  function handleMaxTempoChange(event) {
    onMaxTempoChange(event);
  }

  return (
    <section className="CollectionFilterSection">
      <div className="Row--flat">
        <input
          onChange={handleSearchInput}
          type="text"
          name="SearchFilter"
          id="SearchFilter"
          placeholder="SEARCH:"
        />
        <button
          className="CollectionFilterSection__SortButton"
          onClick={handleDropDownButtonClick}
        >
          Sort
          <ArrowIcon
            className={`CollectionFilterSection__SortButtonIcon ${
              dropdown && `active`
            }`}
          />
        </button>
      </div>
      <div
        className={`CollectionFilterSection__SortDropdownMenu ${
          dropdown && `active`
        }`}
        ref={dropdownRef}
      >
        <ul className="CollectionFilterSection__SortDropdownSelectionList">
          <SortCollectionByItem
            text="Track Title, A-Z"
            sortValue="trackTitle_AtoZ"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="Track Title, Z-A"
            sortValue="trackTitle_ZtoA"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="Artist Name, A-Z"
            sortValue="artistName_AtoZ"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="Artist Name, Z-A"
            sortValue="artistName_ZtoA"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="Record Title, A-Z"
            sortValue="recordTitle_AtoZ"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="Record Title, Z-A"
            sortValue="recordTitle_ZtoA"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="BPM, slow to fast"
            sortValue="bpm_0to9"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="BPM, fast to slow"
            sortValue="bpm_9to0"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="Date, old to new"
            sortValue="date_0to9"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortCollectionByItem
            text="Date, new to old"
            sortValue="date_9to0"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
        </ul>
      </div>
      <div className="Row--flat --space-between">
        <label htmlFor="TempoFilter__min">TEMPO:</label>
        <div className="CollectionFilterSection__TempoFilterSection">
          <input
            onChange={handleMinTempoChange}
            type="text"
            name="TempoFilter__min"
            id="TempoFilter__min"
            maxLength="3"
            placeholder="MIN"
            inputMode="numeric"
          />
          <p>-</p>
          <input
            onChange={handleMaxTempoChange}
            type="text"
            name="TempoFilter__max"
            id="TempoFilter__max"
            maxLength="3"
            placeholder="MAX"
            inputMode="numeric"
          />
        </div>
      </div>
    </section>
  );
}
