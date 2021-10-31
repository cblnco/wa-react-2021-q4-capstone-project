import React from 'react';
import categoryData from '../../mocks/en-us/product-categories.json';
import featProductsData from '../../mocks/en-us/featured-products.json';
import BannerSlider from '../BannerSlider';
import Categories from '../Categories';
import Featured from '../Products/Fetaured';
import ContentContainer from '../ContentContainer';
import { useFeaturedBanners } from '../../utils/hooks/useFeaturedBanners';

const Home = () => {
  const {
    data: { results: bannerData },
    isLoading,
  } = useFeaturedBanners();

  return (
    <>
      <BannerSlider banners={bannerData} isLoading={isLoading} />
      <ContentContainer>
        <Categories categories={categoryData.results} />
        <Featured products={featProductsData.results} />
      </ContentContainer>
    </>
  );
};

export default Home;
