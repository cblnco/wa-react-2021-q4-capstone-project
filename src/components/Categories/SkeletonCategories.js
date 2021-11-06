import React from 'react';
import styled from 'styled-components';

const SkeletonItem = styled.div`
  height: 14vh;
  max-height: 14rem;
  border-radius: 4px;
  gap: 1rem;
  grid-auto-flow: dense;
  grid-auto-rows: auto;
  background-color: #d4d3cf;
  object-fit: cover;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
`;

const SkeletonCategories = ({ amount = 5 }) => {
  const skeletonAmount = new Array(amount).fill();
  return skeletonAmount.map((_, idx) => (
    <SkeletonItem key={`skeleton-category-item-${idx}`} />
  ));
};

export default SkeletonCategories;
