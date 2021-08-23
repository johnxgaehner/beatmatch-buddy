import { useEffect, useState } from "react";

export default function useOutsideClick(reference, initialState) {
  const [dropdown, setDropdown] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (reference.current !== null && !reference.current.contains(e.target)) {
        setDropdown(!dropdown);
      }
    };
    if (dropdown) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [dropdown, reference]);

  return [dropdown, setDropdown];
}
