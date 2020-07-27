import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import { AppContext } from "./App";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeydown from "../hooks/useKeydown.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";

const Game = () => {
  const {
    numCookies,
    setNumCookies,
    items,
    setItems,
    purchasedItems,
    setPurchasedItems,
  } = React.useContext(AppContext);

  const calculateCookiesPerClick = () => {
    return (
      items.items
        .map((item) => item.click * purchasedItems[item.id])
        .reduce((val, acc) => val + acc) + 1
    );
  };

  const calculateCookiesPerTick = () => {
console.log(items.items)
    return items.items
      .map((item) => item.value * purchasedItems[item.id])
      .reduce((val, acc) => val + acc);
  };

  const incrementCookies = (increment) => {
    setNumCookies((n) => n + increment);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick();
    setNumCookies(numOfGeneratedCookies + numCookies);
  }, 1000);

  useKeydown("Space", () => incrementCookies(calculateCookiesPerClick()));
  useDocumentTitle(`${numCookies} cookies - Cookie clicker`, "Coockie clicker");

  const handleClick = (id, cost) => {
    if (numCookies - cost >= 0) {
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
      setItems( { items:
        items.items.map((item, index) =>
          item.id === id ? { ...item, cost: item.cost * (index + 1) * 2 } : item
        )}
      );
      setNumCookies((n) => n - cost);
    } else {
      window.alert(
        `You just can't. Item is ${cost} but you only have ${numCookies}.`
      );
    }
  };

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{Number(numCookies)} cookies</Total>
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie
            src={cookieSrc}
            onClick={() => incrementCookies(calculateCookiesPerClick())}
          />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>

        {items.items.map((item, index) => (
          <Item
            key={item.id}
            name={item.name}
            cost={item.cost}
            value={item.value}
            click={item.click}
            numOwned={purchasedItems[item.id]}
            isFirst={index === 0}
            handleClick={() => handleClick(item.id, item.cost)}
          />
        ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
