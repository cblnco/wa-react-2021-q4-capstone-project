import React from 'react';
import styled from 'styled-components';
import useRoute from '../../hooks/useRoute';
import BannerSlider from '../BannerSlider';
import Categories from '../Categories';
import Fetaured from '../Products/Fetaured';
import bannerData from '../../mocks/en-us/featured-banners.json';
import categoryData from '../../mocks/en-us/product-categories.json';
import featProductsData from '../../mocks/en-us/featured-products.json';
import productData from '../../mocks/en-us/products.json';
import Catalog from '../Products/Catalog';

const ContentContainer = styled.div`
  margin: 0 12%;
  padding: 3rem 1rem;
`;

const MainPage = () => {
  const [route] = useRoute();
  return (
    <>
      {route === '/' ? (
        <>
          <BannerSlider banners={bannerData.results} />
          <ContentContainer>
            <Categories categories={categoryData.results} />
            <Fetaured products={featProductsData.results} />
          </ContentContainer>
        </>
      ) : (
        <>
          <ContentContainer>
            <Catalog
              products={productData.results}
              categories={categoryData.results}
            />
          </ContentContainer>
        </>
      )}
    </>
  );
};

export default MainPage;
