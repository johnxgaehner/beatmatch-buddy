import { useEffect, useState } from "react";

export default function useOutsideClick(reference, initialState) {
  const [isVisible, setIsVisible] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (reference.current !== null && !reference.current.contains(e.target)) {
        setIsVisible(!isVisible);
      }
    };
    if (isVisible) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isVisible, reference]);

  return [isVisible, setIsVisible];
}
