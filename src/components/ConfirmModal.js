import "./ConfirmModal.css";

export default function ConfirmModal({
  onConfirmation,
  setConfirmIsOpen,
  text,
}) {
  function handleConfirmation() {
    onConfirmation();
  }

  function handleCancellation() {
    setConfirmIsOpen(false);
  }

  return (
    <div className="ConfirmModal">
      <p>Do you really want to delete this {text}?</p>
      <div className="ConfirmModal__ButtonContainer">
        <button onClick={handleCancellation}>no</button>
        <button onClick={handleConfirmation}>yes</button>
      </div>
    </div>
  );
}
