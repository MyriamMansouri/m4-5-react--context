import React from "react";
import usePersistedState from "../hooks/userPersistedState.hook";
import { items } from "../data/data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState(1000, "numCookies");
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    {
      cursor: 0,
      megacursor: 0,
      grandma: 0,
      farm: 0,
    },
    "purchasedItems"
  );

  React.useEffect(() => {
    window.localStorage.setItem("numCookies", numCookies);
  }, [numCookies]);
  React.useEffect(() => {
    window.localStorage.setItem(
      "purchasedItems",
      JSON.stringify(purchasedItems)
    );
  }, [purchasedItems]);

  const calculateCookiesPerTick = () => {
    return items
      .map((item) => item.value * purchasedItems[item.id])
      .reduce((val, acc) => val + acc);
  };

  const calculateCookiesPerClick = () => {
    return (
      items
        .map((item) => item.click * purchasedItems[item.id])
        .reduce((val, acc) => val + acc) + 1
    );
  };

  const incrementCookies = (increment) => {
    setNumCookies((n) => n + increment);
  };

  return (
    <GameContext.Provider
      value={{
        items,
        numCookies,
        incrementCookies: incrementCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerTick(),
        cookiesPerClick: calculateCookiesPerClick(),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
