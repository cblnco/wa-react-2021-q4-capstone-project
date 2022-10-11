import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import styled from 'styled-components';

const UnitsContainer = styled.div`
  width: 10rem;
  height: 2.4rem;
  margin-bottom: 4rem;
  box-shadow: 2px 3px 5px -4px rgba(0, 0, 0, 0.32);

  * {
    box-sizing: border-box;
  }
`;

const CartButton = styled.button`
  width: 25vw;
  min-width: 12rem;
  max-width: 32rem;
  padding: 0.6rem;
  font-size: 21px;

  background-color: #dedede;
  border: 1px solid #c9c9c9;
  color: #969494;
  background-color: ${({ isActive }) => (isActive ? '#d3c8b4' : '#dedede')};
  border: ${({ isActive }) =>
    isActive ? '1px solid #aaa79f' : '1px solid #c9c9c9'};
  color: ${({ isActive }) => (isActive ? '#474645' : '#969494')};
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 2px 3px 5px -4px rgba(0, 0, 0, 0.32);

  &:hover {
    ${({ isActive }) =>
      isActive &&
      `color: #52504f; 
    background-color: #d9ccb3;
    border: solid 1px #b5b3ad;`}
  }

  &:active {
    ${({ isActive }) =>
      isActive &&
      `color: #3e3d3d;
    margin-left: 1px;
    background-color: #cabfab;`}
  }
`;

const Title = styled.div`
  font-size: 20px;
  color: #413f3c;
  margin-bottom: 2.3rem;
`;

const Button = styled.button`
  background-color: white;
  height: 100%;
  border: 2px solid #cbc8c1;
  height: 2.4rem;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'not-allowed')};
`;

const Input = styled.input`
  height: 100%;
  width: 5rem;
  color: #767472;
  font-size: 20px;
  border-top: 2px solid #cbc8c1;
  vertical-align: top;
  border-bottom: 2px solid #cbc8c1;
  border-left: 0;
  border-right: 0;
  text-align: center;
`;

const Stock = styled.div`
  font-size: 15px;
  color: #413f3c;
  margin-bottom: 0.3rem;
`;

export const Units = ({
  isUpDisabled,
  isDownDisabled,
  quantity,
  changeQuantity,
}) => (
  <UnitsContainer>
    <Button
      isActive={!isDownDisabled}
      disabled={isDownDisabled}
      onClick={() => changeQuantity(-1)}
    >
      <ChevronDown color="#767472" />
    </Button>
    <Input value={quantity} disabled />
    <Button
      isActive={!isUpDisabled}
      disabled={isUpDisabled}
      onClick={() => changeQuantity(1)}
    >
      <ChevronUp color="#767472" />
    </Button>
  </UnitsContainer>
);

const Quantity = ({ stock, productQuantity, onCartDispatch }) => {
  const isDisabled = stock === productQuantity;
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = increment => {
    let value = quantity + increment;
    if (value < 1 || value + productQuantity > stock) {
      return;
    }

    setQuantity(quantity + increment);
  };

  const onAddToCart = () => {
    setQuantity(1);
    onCartDispatch(quantity);
  };

  return (
    <>
      <Title>QUANTITY</Title>
      <Stock>Current stock: {stock}</Stock>
      <Units
        isUpDisabled={isDisabled}
        isDownDisabled={isDisabled}
        quantity={quantity}
        changeQuantity={changeQuantity}
      />
      <CartButton
        isActive={!isDisabled}
        disabled={isDisabled}
        onClick={onAddToCart}
      >
        Add to cart
      </CartButton>
    </>
  );
};

export default Quantity;
