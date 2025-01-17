import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import SkeletonCategories from './SkeletonCategories';

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 3rem;
`;

const Item = styled.div`
  position: relative;
  cursor: pointer;
`;

const Gradient = styled.div`
  position: absolute;
  background-color: #0000006b;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 4px;
  transition: all 0.4s ease-out;

  &:hover {
    opacity: 0.2;
  }
`;

const CardName = styled.div`
  width: 100%;
  top: 50%;
  text-align: center;
  font-size: 26px;
  color: white;
  position: absolute;
  text-shadow: 1px 2px 5px rgb(23, 23, 23);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
`;

const CategoryContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: dense;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  margin-bottom: 3rem;
`;

const Card = ({ name, imgSrc, alt, category, redirect }) => (
  <Item onClick={() => redirect(category)}>
    <Image src={imgSrc} alt={alt} />
    <Gradient />
    <CardName>{name}</CardName>
  </Item>
);

const categoryCards = (categories, redirect) =>
  categories.map(
    ({
      id,
      slugs,
      data: {
        name,
        main_image: { alt, url },
      },
    }) => (
      <Card
        key={`category-${id}`}
        name={name}
        category={slugs[0]}
        imgSrc={url}
        alt={alt}
        redirect={redirect}
      />
    )
  );

const Categories = ({ categories = [], isLoading }) => {
  const history = useHistory();

  const toProduct = category => history.push(`/products?category=${category}`);

  const cards = isLoading ? (
    <SkeletonCategories amount={5} />
  ) : (
    categoryCards(categories, toProduct)
  );

  return (
    <>
      <Title>Our categories</Title>
      <CategoryContainer>{cards}</CategoryContainer>
    </>
  );
};

export default Categories;
