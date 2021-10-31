import React from 'react';
import { Loader } from 'react-feather';
import styled, { keyframes } from 'styled-components';

const ProductContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: dense;
  grid-auto-rows: auto;
  grid-template-columns: ${({ productsLength }) =>
    `repeat(auto-fit, ${productsLength > 2 ? 'minmax(15rem, 1fr)' : '20rem'})`};
  margin-bottom: 100%;
`;

const ProductContent = styled.div`
  display: grid;
  justify-items: center;
  border-radius: 2px;
  border: solid 1px #cbc8c1;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
`;

const ImagePlaceholder = styled.div`
  height: 14rem;
  background-color: #efefef;
  width: 100%;
`;

const Description = styled.div`
  width: 100%;
  text-align: center;
  background-color: #f2e9da;
  min-height: 6rem;
  border-top: solid 1px #cbc8c1;
  padding: 0.5rem 0;
`;

const StyledLoader = styled(Loader)`
  padding: 1.5rem;
`;

const spinAnimation = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${spinAnimation} infinite 4s linear;
`;

const Product = () => (
  <ProductContent>
    <ImagePlaceholder />
    <Description>
      <Spinner>
        <StyledLoader size={40} color="#8b8b8b" />
      </Spinner>
    </Description>
  </ProductContent>
);

const Skeleton = ({ amount = 0 }) => {
  const placeholders = new Array(amount).fill();
  return placeholders.map((_, idx) => (
    <Product key={`product-skeleton-${idx}`} />
  ));
};

export default Skeleton;
