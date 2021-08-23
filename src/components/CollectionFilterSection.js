import { useRef } from "react";
import { ReactComponent as ArrowIcon } from "../assets/icon_arrow.svg";
import { ReactComponent as IconSelectionEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_circle_filled.svg";
import useOutsideClick from "../hooks/useOutsideClick";

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

  function handleMinTempoChange(event) {
    onMinTempoChange(event);
  }

  function handleMaxTempoChange(event) {
    onMaxTempoChange(event);
  }

  function handleDropDownButtonClick() {
    setDropdown(!dropdown);
  }

  function handleSortButtonClick(event) {
    onSortButtonClick(event.target.id);
    setDropdown(!dropdown);
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
          className="CollectionFilterSection__Sort"
          onClick={handleDropDownButtonClick}
        >
          Sort{" "}
          <ArrowIcon
            className={`CollectionFilterSection__SortIcon ${
              dropdown ? `active` : `inactive`
            }`}
          />
        </button>
      </div>
      <div
        className={`CollectionFilterSection__SortDropdown ${
          dropdown ? `active` : `inactive`
        }`}
        ref={dropdownRef}
      >
        <ul className="CollectionFilterSection__SortDropdownList">
          <SortDropDownListItem
            text="Track Title, A-Z"
            sortValue="trackTitle_AtoZ"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
            text="Track Title, Z-A"
            sortValue="trackTitle_ZtoA"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
            text="Artist Name, A-Z"
            sortValue="artistName_AtoZ"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
            text="Artist Name, Z-A"
            sortValue="artistName_ZtoA"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
            text="Record Title, A-Z"
            sortValue="recordTitle_AtoZ"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
            text="Record Title, Z-A"
            sortValue="recordTitle_ZtoA"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
            text="BPM, slow to fast"
            sortValue="bpm_0to9"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
            text="BPM, fast to slow"
            sortValue="bpm_9to0"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
            text="Date, old to new"
            sortValue="date_0to9"
            handleSortButtonClick={handleSortButtonClick}
            sortByValue={sortByValue}
          />
          <SortDropDownListItem
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

function SortDropDownListItem({
  handleSortButtonClick,
  sortByValue,
  sortValue,
  text,
}) {
  return (
    <li onClick={handleSortButtonClick} id={sortValue}>
      {sortByValue === sortValue ? (
        <IconSelectionFilled className="CollectionFilterSection__SelectionIcon" />
      ) : (
        <IconSelectionEmpty className="CollectionFilterSection__SelectionIcon" />
      )}
      {text}
    </li>
  );
}
