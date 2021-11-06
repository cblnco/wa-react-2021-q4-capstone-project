import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import styled from 'styled-components';

const Units = styled.div`
  width: 9.5rem;
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
  background-color: #d3c8b4;
  border: 1px solid #aaa79f;
  color: #474645;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 2px 3px 5px -4px rgba(0, 0, 0, 0.32);

  &:hover {
    color: #52504f;
    background-color: #d9ccb3;
    border: solid 1px #b5b3ad;
  }

  &:active {
    color: #3e3d3d;
    margin-left: 1px;
    background-color: #cabfab;
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
  cursor: pointer;
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

const Quantity = ({ stock }) => {
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = increment => {
    let value = quantity + increment;
    if (value < 1) {
      value = 1;
    } else if (value > stock) {
      value = stock;
    }

    setQuantity(value);
  };

  return (
    <>
      <Title>QUANTITY</Title>
      <Stock>Current stock: {stock}</Stock>
      <Units>
        <Button onClick={() => changeQuantity(-1)}>
          <ChevronDown color="#767472" />
        </Button>
        <Input value={quantity} disabled />
        <Button onClick={() => changeQuantity(1)}>
          <ChevronUp color="#767472" />
        </Button>
      </Units>
      <CartButton>Add to cart</CartButton>
    </>
  );
};

export default Quantity;
