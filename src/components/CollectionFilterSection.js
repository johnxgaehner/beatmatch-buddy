import { useState, useRef } from "react";
import { ReactComponent as ArrowIcon } from "../assets/icon_arrow.svg";
import { ReactComponent as IconSelectionEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_circle_filled.svg";

import "./CollectionFilterSection.css";

export default function CollectionFilterSection({
  onSearchInput,
  onMinTempoChange,
  onMaxTempoChange,
  onSortButtonClick,
  sortByValue,
}) {
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);

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
          className="CollectionPage__Sort"
          onClick={handleDropDownButtonClick}
        >
          Sort{" "}
          <ArrowIcon
            className={`CollectionPage__SortIcon ${
              dropdown ? `active` : `inactive`
            }`}
          />
        </button>
      </div>
      <div
        className={`CollectionPage__SortDropdown ${
          dropdown ? `active` : `inactive`
        }`}
        ref={dropdownRef}
      >
        <ul className="CollectionPage__SortDropdownList">
          <li onClick={handleSortButtonClick} id="trackTitle_AtoZ">
            {sortByValue === "trackTitle_AtoZ" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            Track Title, A-Z
          </li>
          <li onClick={handleSortButtonClick} id="trackTitle_ZtoA">
            {sortByValue === "trackTitle_ZtoA" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            Track Title, Z-A
          </li>
          <li onClick={handleSortButtonClick} id="artistName_AtoZ">
            {sortByValue === "artistName_AtoZ" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            Artist Name, A-Z
          </li>
          <li onClick={handleSortButtonClick} id="artistName_ZtoA">
            {sortByValue === "artistName_ZtoA" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            Artist Name, Z-A
          </li>
          <li onClick={handleSortButtonClick} id="recordTitle_AtoZ">
            {sortByValue === "recordTitle_AtoZ" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            Record Title, A-Z
          </li>
          <li onClick={handleSortButtonClick} id="recordTitle_ZtoA">
            {sortByValue === "recordTitle_ZtoA" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            Record Title, Z-A
          </li>
          <li onClick={handleSortButtonClick} id="bpm_0to9">
            {sortByValue === "bpm_0to9" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            BPM, slow to fast
          </li>
          <li onClick={handleSortButtonClick} id="bpm_9to0">
            {sortByValue === "bpm_9to0" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            BPM, fast to slow
          </li>
          <li onClick={handleSortButtonClick} id="date_0to9">
            {sortByValue === "date_0to9" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            Date, old to new
          </li>
          <li onClick={handleSortButtonClick} id="date_9to0">
            {sortByValue === "date_9to0" ? (
              <IconSelectionFilled className="CollectionPage__SelectionIcon" />
            ) : (
              <IconSelectionEmpty className="CollectionPage__SelectionIcon" />
            )}
            Date, new to old
          </li>
        </ul>
      </div>
      <div className="Row--flat --space-between">
        <label htmlFor="TempoFilter__min">TEMPO:</label>
        <div className="CollectionPage__TempoFilterSection">
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
