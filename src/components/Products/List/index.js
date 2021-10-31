import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from 'react-feather';

const ProductContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: dense;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  margin-bottom: 4rem;
`;

const ProductContent = styled.div`
  display: grid;
  justify-items: center;
  border-radius: 2px;
  border: solid 1px #cbc8c1;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
`;

const Image = styled.img`
  width: 70%;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
`;

const Description = styled.div`
  width: 100%;
  text-align: center;
  background-color: #f2e9da;
  color: #7d7d7d;
  min-height: 6rem;
  border-top: solid 1px #cbc8c1;
  padding: 0.5rem 0;
`;

const ProductName = styled.div`
  color: #5d5b5b;
  font-size: 18px;
  padding-bottom: 0.3rem;
`;

const ProductPrice = styled.div`
  font-weight: 800;
  color: #5d5b5b;
  padding-bottom: 1rem;
`;

const NoProducts = styled.h2`
  margin-top: 3rem;
  margin-bottom: 100%;
`;

const Navigation = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Pages = styled.div`
  font-size: 29px;
  width: 100%;
  display: flex;
  justify-content: center;
  color: black;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: not-allowed;
`;

const Product = ({ name, background, category, price, alt }) => (
  <ProductContent>
    <Image src={background} alt={alt} />
    <Description>
      <ProductName>{name}</ProductName>
      <ProductPrice>
        <b>{price} $</b>
      </ProductPrice>
      <div>{category}</div>
    </Description>
  </ProductContent>
);

const List = ({ products, filters = null, pagination = false }) => {
  const filteredProducts = filters
    ? products.filter(product => {
        const {
          data: {
            category: { id },
          },
        } = product;

        return filters[id];
      })
    : products;

  return (
    <div>
      <ProductContainer>
        {filteredProducts.map(
          ({
            id,
            data: {
              name,
              price,
              category: { slug },
              mainimage: { url, alt },
            },
          }) => (
            <Product
              key={`product-${id}`}
              background={url}
              name={name}
              category={slug}
              price={price}
              alt={alt}
            />
          )
        )}
        {!filteredProducts.length && (
          <NoProducts>No products available</NoProducts>
        )}
      </ProductContainer>
      {pagination && filteredProducts.length && (
        <Navigation>
          <Button>
            <ArrowLeft size={26} />
          </Button>
          <Pages>1</Pages>
          <Button>
            <ArrowRight size={26} />
          </Button>
        </Navigation>
      )}
    </div>
  );
};

export default List;
