import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import { GameContext } from "./GameContext";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeydown from "../hooks/useKeydown.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";

const Game = () => {
  const {
    items,
    numCookies,
    purchasedItems,
    setPurchasedItems,
    cookiesPerSecond,
    cookiesPerClick,
    incrementCookies,
  } = React.useContext(GameContext);

  useInterval(() => incrementCookies(cookiesPerSecond), 1000);
  useKeydown("Space", () => incrementCookies(cookiesPerClick   ));

  const updatedCost = (id, cost) => {
    return cost * (purchasedItems[id] + 1);
  };

  useDocumentTitle(`${numCookies} cookies - Cookie clicker`, "Coockie clicker");

  const handleClick = (id, cost) => {
    const newCost = updatedCost(id, cost)
    if (numCookies - newCost >= 0) {
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
      incrementCookies(-newCost);
    } else {
      window.alert(
        `You just can't. Item is ${newCost} but you only have ${numCookies}.`
      );
    }
  };

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cookiesPerSecond}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie
            src={cookieSrc}
            onClick={() => incrementCookies(cookiesPerClick)}
          />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>

        {items.map((item, index) => (
          <Item
            key={item.id}
            name={item.name}
            cost={updatedCost(item.id, item.cost)}
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
