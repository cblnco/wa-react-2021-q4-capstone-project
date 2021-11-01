import React from 'react';
import { Loader } from 'react-feather';
import styled, { keyframes } from 'styled-components';

const ProductContent = styled.div`
  border-radius: 2px;
  border: solid 1px #cbc8c1;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
`;

const ImageContent = styled.div`
  position: relative;
`;

const ImagePlaceholder = styled.div`
  min-height: 16rem;
  width: 100%;
  background-color: #efefef;
  object-fit: contain;
`;

const Description = styled.div`
  text-align: center;
  background-color: #f2e9da;
  min-height: 6rem;
  border-top: solid 1px #cbc8c1;
  padding: 0.7rem;
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
    <ImageContent>
      <ImagePlaceholder />
    </ImageContent>
    <Description>
      <Spinner>
        <StyledLoader size={40} color="#5d5b5b" />
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
