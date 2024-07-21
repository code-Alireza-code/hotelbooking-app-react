import { useEffect, useRef } from "react";

export default function useOutsideClick(exceptionId, cb) {
  const ref = useRef();
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      )
        cb();
    }
    document.addEventListener("click", handleOutsideClick);

    // cleanup
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, cb, exceptionId]);
  return { ref };
}
