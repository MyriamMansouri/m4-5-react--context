import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

import usePersistedState from "../hooks/userPersistedState.hook";

import { data } from "../data/data";
export const AppContext = React.createContext(null);

function App(props) {
  const [numCookies, setNumCookies] = usePersistedState(1000,"numCookies");
  const [items, setItems] = usePersistedState(data,"items");
  const [purchasedItems, setPurchasedItems] = usePersistedState({
    cursor: 0,
    megacursor: 0,
    grandma: 0,
    farm: 0,
  }, "purchasedItems");

  React.useEffect(() => {
    window.localStorage.setItem("numCookies", numCookies);
  }, [numCookies]);
  React.useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  React.useEffect(() => {
    window.localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  return (
    <AppContext.Provider
      value={{
        numCookies,
        setNumCookies,
        items,
        setItems,
        purchasedItems,
        setPurchasedItems,
      }}
    >
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
