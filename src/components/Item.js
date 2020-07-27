import React, { useEffect } from "react";
import styled from "styled-components";

const ItemWrapper = styled.button`
  background-color: inherit;
  color: inherit;
  text-align: inherit;
  font-size: inherit;
  border: none;
  border-bottom: grey 1px solid;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .num-owned {
    font-size: 1.95rem;
    padding: 0 15px;
  }
  &:focus {
    outline: blue solid 3px;
  }
`;

const Item = ({ name, cost, value, click, numOwned, isFirst, handleClick }) => {
  const itemRef = React.useRef(null);
  useEffect(() => {
    if (isFirst) {
      itemRef.current.focus();
    }
  }, [isFirst]);

  return (
    <ItemWrapper onClick={handleClick} ref={itemRef}>
      <div>
        <h4>{name}</h4>
        <p>
          Cost: {cost} cookies. Produces {value} cookies/second.
        </p>
        <p>Increases cookies/click to {click}.</p>
      </div>
      <div className="num-owned">{numOwned}</div>
    </ItemWrapper>
  );
};

export default Item;
