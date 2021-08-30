import showToast from "../services/showToast";
import "./ConfirmModal.css";

export default function ConfirmModal({
  onConfirmation,
  setConfirmIsOpen,
  text,
}) {
  function handleConfirmation() {
    onConfirmation();
    showToast(`${text.toUpperCase()} DELETED.`);
  }

  function handleCancellation() {
    setConfirmIsOpen(false);
  }

  return (
    <div className="ConfirmModal">
      <p>
        Do you really want
        <br />
        to delete this {text}?
      </p>
      <div className="ConfirmModal__ButtonContainer">
        <button
          onClick={handleCancellation}
          className="ConfirmModal__CancelButton"
        >
          no
        </button>
        <button
          onClick={handleConfirmation}
          className="ConfirmModal__ConfirmButton"
        >
          yes
        </button>
      </div>
    </div>
  );
}