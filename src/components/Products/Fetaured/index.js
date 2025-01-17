import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

const StyledLink = styled(Link)`
  background-color: #f2e9da;
  border: none;
  cursor: pointer;
  color: #6f6969;
  font-size: 20px;
  padding: 1rem;
  border-radius: 3px;
  box-shadow: 2px 3px 5px -4px rgba(0, 0, 0, 0.32);
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  border: solid 1px #e0e0e0;

  &:hover {
    border: solid 1px #d4d1d1;
  }

  &:active {
    margin-left: 1px;
    background-color: #dedbd5;
  }
`;

const Featured = ({ products = [], isLoading }) => {
  return (
    <>
      <Title>Featured products</Title>
      <List products={products} isLoading={isLoading} />
      <ButtonContainer>
        <div />
        <StyledLink to="/products">View all products</StyledLink>
      </ButtonContainer>
    </>
  );
};

export default Featured;
