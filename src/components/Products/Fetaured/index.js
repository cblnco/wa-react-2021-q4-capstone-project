import React from 'react';
import styled from 'styled-components';
import useRoute from '../../../hooks/useRoute';
import List from '../List';

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 3rem;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 19rem;
  margin-bottom: 3rem;
`;

const Button = styled.div`
  background-color: #e9e1d2;
  border: none;
  cursor: pointer;
  color: #635f5f;
  font-size: 20px;
  padding: 1rem;
  border-radius: 3px;
  box-shadow: 2px 3px 5px -4px rgba(0, 0, 0, 0.32);
  text-align: center;
  transition: 0.2s ease-in-out;
  border: solid 1px transparent;

  &:hover {
    border: solid 1px #d4d1d1;
  }

  &:active {
    margin-left: 1px;
    background-color: #dedbd5;
  }
`;

const Featured = ({ products = [] }) => {
  const [, setRoute] = useRoute();
  return (
    <>
      <Title>Featured products</Title>
      <List products={products} />
      <ButtonContainer>
        <div />
        <Button onClick={() => setRoute('/products')}>View all products</Button>
      </ButtonContainer>
    </>
  );
};

export default Featured;
