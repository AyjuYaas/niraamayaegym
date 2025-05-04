import { useEffect, useRef } from "react";

const useClickOutside = (onClickOutside) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (!ref.current) return;

      // Check if the click target is outside the referenced element
      if (!ref.current.contains(event.target)) {
        onClickOutside?.(); // Call the outside click handler
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClickOutside]);

  return ref;
};

export default useClickOutside;
