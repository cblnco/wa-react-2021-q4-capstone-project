import React from 'react';
import BannerSlider from '../BannerSlider';
import Categories from '../Categories';
import Featured from '../Products/Fetaured';
import ContentContainer from '../ContentContainer';
import {
  usePrismicAPI,
  BANNERS,
  CATEGORIES,
  FEATURED_PRODS,
} from '../../utils/hooks/usePrismicAPI';

const Home = () => {
  const {
    data: { results: bannerData },
    isLoading: areBannersLoading,
  } = usePrismicAPI(BANNERS);

  const {
    data: { results: categoryData },
    isLoading: areCategoriesLoading,
  } = usePrismicAPI(CATEGORIES);

  const {
    data: { results: ftrdProductsData },
    isLoading: areFtrdProductsLoading,
  } = usePrismicAPI(FEATURED_PRODS);

  return (
    <>
      <BannerSlider banners={bannerData} isLoading={areBannersLoading} />
      <ContentContainer>
        <Categories
          categories={categoryData}
          isLoading={areCategoriesLoading}
        />
        <Featured
          products={ftrdProductsData}
          isLoading={areFtrdProductsLoading}
        />
      </ContentContainer>
    </>
  );
};

export default Home;
