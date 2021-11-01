import React from 'react';
import styled from 'styled-components';
import Skeleton from '../Skeleton';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';

const ProductContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: dense;
  grid-auto-rows: auto;
  grid-template-columns: ${({ productsLength }) =>
    `repeat(auto-fit, ${productsLength > 2 ? 'minmax(16rem, 1fr)' : '20rem'})`};
  margin-bottom: 4rem;
`;

const ProductContent = styled.div`
  border-radius: 2px;
  border: solid 1px #cbc8c1;
  box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.32);
`;

const PictureContent = styled.div`
  position: relative;
`;

const Image = styled.img`
  background-position: center;
  background-size: cover;
  max-height: 16rem;
  width: 100%;
  object-fit: contain;
`;

const Category = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #e1dfdc;
  padding: 0.3rem;
  font-size: 16px;
  color: #7e7b77;
  margin-right: 0.3rem;
`;

const Description = styled.div`
  background-color: #f2e9da;
  color: #5d5b5b;
  min-height: 6rem;
  border-top: solid 1px #cbc8c1;
  padding: 0.7rem;
`;

const ProductName = styled.div`
  font-size: 20px;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContent = styled.div`
  margin-bottom: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1.2rem;
`;

const ProductPrice = styled.div`
  font-weight: 800;
  font-size: 17px;
`;

const DetailsContent = styled.div`
  text-align: end;
`;

const DetailsLink = styled(Link)`
  font-weight: 800;
  font-size: 17px;
  color: #918b83;
`;

const CartButton = styled.button`
  width: 100%;
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

const NoProducts = styled.h2`
  margin-top: 3rem;
  height: 73vh;
`;

const Product = ({ id, name, background, category, price, alt }) => (
  <ProductContent>
    <PictureContent>
      <Image src={background} alt={alt} />
      <Category>{category}</Category>
    </PictureContent>
    <Description>
      <ProductName>{name}</ProductName>
      <PriceContent>
        <ProductPrice>{price} $</ProductPrice>
        <DetailsContent>
          <DetailsLink to={`/product/${id}`}>More details</DetailsLink>
        </DetailsContent>
      </PriceContent>
      <CartButton>Add to cart</CartButton>
    </Description>
  </ProductContent>
);

const List = ({
  products,
  filters = null,
  isLoading,
  pagination = false,
  skeletonAmount = 2,
}) => {
  const { page, total_pages, next_page, prev_page, results } = products;
  const filteredProducts = isLoading
    ? []
    : filters
    ? results.filter(product => {
        const {
          data: {
            category: { id },
          },
        } = product;

        return filters[id];
      })
    : results;

  return (
    <div>
      <ProductContainer
        productsLength={isLoading ? skeletonAmount : filteredProducts.length}
      >
        {!isLoading ? (
          filteredProducts.map(
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
                id={id}
                background={url}
                name={name}
                category={slug}
                price={price}
                alt={alt}
              />
            )
          )
        ) : (
          <Skeleton amount={skeletonAmount} />
        )}
        {!isLoading && !filteredProducts.length && (
          <NoProducts>No products available</NoProducts>
        )}
      </ProductContainer>
      {pagination && !isLoading && filteredProducts.length > 0 && (
        <Navigation
          currentPage={page}
          totalPages={total_pages}
          nextPage={next_page}
          prevPage={prev_page}
        />
      )}
    </div>
  );
};

export default List;
