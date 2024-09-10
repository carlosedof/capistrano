// hooks/useOutsideClick.js
import { useEffect, useRef } from "react";

/**
 * Custom hook to detect clicks outside the referenced element.
 * @param {Function} handler - The callback function to call when a click outside is detected.
 */
function useOutsideClick(handler) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [handler]);

  return ref;
}

export default useOutsideClick;
