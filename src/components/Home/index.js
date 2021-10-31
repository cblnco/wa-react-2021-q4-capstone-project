import React from 'react';
import featProductsData from '../../mocks/en-us/featured-products.json';
import BannerSlider from '../BannerSlider';
import Categories from '../Categories';
import Featured from '../Products/Fetaured';
import ContentContainer from '../ContentContainer';
import {
  usePrismicAPI,
  BANNERS,
  CATEGORIES,
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

  return (
    <>
      <BannerSlider banners={bannerData} isLoading={areBannersLoading} />
      <ContentContainer>
        <Categories
          categories={categoryData}
          isLoading={areCategoriesLoading}
        />
        <Featured products={featProductsData.results} />
      </ContentContainer>
    </>
  );
};

export default Home;
