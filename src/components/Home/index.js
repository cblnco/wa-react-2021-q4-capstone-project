import React from 'react';
import featProductsData from '../../mocks/en-us/featured-products.json';
import BannerSlider from '../BannerSlider';
import Categories from '../Categories';
import Featured from '../Products/Fetaured';
import ContentContainer from '../ContentContainer';
import { useFeaturedBanners } from '../../utils/hooks/useFeaturedBanners';
import useCategories from '../../utils/hooks/useCategories';

const Home = () => {
  const {
    data: { results: bannerData },
    isLoading: areBannersLoading,
  } = useFeaturedBanners();

  const {
    data: { results: categoryData },
    isLoading: areCategoriesLoading,
  } = useCategories();

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
