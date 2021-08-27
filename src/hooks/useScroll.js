import { useState, useEffect } from "react";
import { throttle } from "lodash";

export default function useScroll(callback) {
  // eslint-disable-next-line no-unused-vars
  const [_, setScrollPosition] = useState(0);
  let previousScrollTop = 0;

  function handleScroll() {
    const { scrollTop: currentScrollTop } =
      document.documentElement || document.body;

    setScrollPosition((previousPosition) => {
      previousScrollTop = previousPosition;
      return currentScrollTop;
    });
    callback({ previousScrollTop, currentScrollTop });
  }

  const handleScrollThrottled = throttle(handleScroll, 250);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollThrottled);
    return () => window.removeEventListener("scroll", handleScrollThrottled);
  }, [handleScrollThrottled]);
}
