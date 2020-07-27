import { useEffect } from "react";

function useKeydown(code, callback) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === code) {
        callback();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [code, callback]);
}

export default useKeydown;
