import React from 'react';
import BannerSlider from '../BannerSlider';
import Categories from '../Categories';
import Featured from '../Products/Fetaured';
import ContentContainer from '../ContentContainer';
import {
  usePrismicAPI,
  BANNERS_QUERY,
  CATEGORIES_QUERY,
  FEATURED_PRODS_QUERY,
} from '../../utils/hooks/usePrismicAPI';

const Home = () => {
  const {
    data: { results: bannerData },
    isLoading: areBannersLoading,
  } = usePrismicAPI(BANNERS_QUERY);

  const {
    data: { results: categoryData },
    isLoading: areCategoriesLoading,
  } = usePrismicAPI(CATEGORIES_QUERY);

  const { data: ftrdProductsData, isLoading: areFtrdProductsLoading } =
    usePrismicAPI(FEATURED_PRODS_QUERY);

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
