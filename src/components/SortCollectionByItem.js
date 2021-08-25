import PropTypes from "prop-types";
import { ReactComponent as IconSelectionEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_circle_filled.svg";
import "./SortCollectionByItem.css";

export default function SortCollectionByItem({
  text,
  sortValue,
  currentSortValue,
  onSortSelection,
}) {
  function handleSortValueSelection() {
    onSortSelection(sortValue);
  }

  return (
    <li
      className="SortCollectionByItem__SelectionItem"
      onClick={handleSortValueSelection}
      id={sortValue}
    >
      {currentSortValue === sortValue ? (
        <IconSelectionFilled className="SortCollectionByItem__SelectionIcon" />
      ) : (
        <IconSelectionEmpty className="SortCollectionByItem__SelectionIcon" />
      )}
      {text}
    </li>
  );
}

SortCollectionByItem.propTypes = {
  text: PropTypes.string.isRequired,
  sortValue: PropTypes.string.isRequired,
  currentSortValue: PropTypes.string.isRequired,
  onSortSelection: PropTypes.func.isRequired,
};
