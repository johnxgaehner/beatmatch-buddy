import { ReactComponent as IconSelectionEmpty } from "../assets/icon_circle_empty.svg";
import { ReactComponent as IconSelectionFilled } from "../assets/icon_circle_filled.svg";
import "./SortCollectionByItem.css";

export default function SortCollectionByItem({
  handleSortButtonClick,
  sortByValue,
  sortValue,
  text,
}) {
  return (
    <li
      className="SortCollectionByItem__SelectionItem"
      onClick={handleSortButtonClick}
      id={sortValue}
    >
      {sortByValue === sortValue ? (
        <IconSelectionFilled className="SortCollectionByItem__SelectionIcon" />
      ) : (
        <IconSelectionEmpty className="SortCollectionByItem__SelectionIcon" />
      )}
      {text}
    </li>
  );
}