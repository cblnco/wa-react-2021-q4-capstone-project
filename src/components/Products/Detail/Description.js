import React from 'react';
import styled from 'styled-components';

const TagsTitle = styled.div`
  color: #413f3c;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
`;

const Tag = styled.div`
  color: #6e6c69;
  font-size: 15px;
  padding: 0.3rem;
  text-align: center;
  margin-right: 0.5rem;
  background-color: #feeee0;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2.5rem;
`;

const Sku = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Category = styled.div`
  background-color: #e1dfdc;
  max-width: 43rem;
  padding: 0.3rem;
  font-size: 17px;
  color: #7e7b77;
  margin-right: 0.3rem;
  margin-bottom: 1rem;
`;

const ShortDescription = styled.div`
  color: #74716e;
  max-width: 40rem;
  margin-bottom: 3rem;
`;

const Title = styled.div`
  font-size: 34px;
  margin-bottom: 0.2rem;
`;

const Description = ({
  name,
  sku,
  category,
  shortDescription,
  price,
  tags,
}) => (
  <>
    <Title>{name}</Title>
    <Sku>SKU: {sku}</Sku>
    <Category>{category.slug}</Category>
    <ShortDescription>{shortDescription}</ShortDescription>
    <Price>{`$${price}`}</Price>
    <TagsTitle>Tags</TagsTitle>
    <TagsContainer>
      {tags.map(tag => (
        <Tag key={`product-${tag}-tags`}>{tag}</Tag>
      ))}
    </TagsContainer>
  </>
);

export default Description;
