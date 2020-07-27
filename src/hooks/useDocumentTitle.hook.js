import { useEffect } from "react";

function useDocumentTitle(title, fallbackTitle) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = fallbackTitle;
    };
  }, [title, fallbackTitle]);
}

export default useDocumentTitle;
