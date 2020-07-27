import { useState } from "react";

function usePersistedState(value, name) {
  return useState(
    window.localStorage.getItem(name) ? JSON.parse(window.localStorage.getItem(name)) : value
  );
}

export default usePersistedState;
