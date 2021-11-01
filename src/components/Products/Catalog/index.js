import React from 'react';
import List from '../List';
import styled from 'styled-components';
import useFilter from '../../../utils/hooks/useFilter';
import SideBar from '../../SideBar';
import ContentContainer from '../../ContentContainer';
import { PRODUCTS_QUERY } from '../../../utils/constants';
import {
  usePrismicAPI,
  CATEGORIES_QUERY,
} from '../../../utils/hooks/usePrismicAPI';
import usePrismicRedux from '../../../utils/hooks/usePrismicRedux';
import { PRODUCTS_NAME, updateProducts } from '../../../redux/slices/products';

const CatalogContainer = styled.div`
  margin-top: 4rem;
`;

const PageContent = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 17rem 1fr;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 3rem;
`;

const processFilters = filters => {
  let areFiltersActive = false;

  for (const key in filters) {
    if (filters.hasOwnProperty(key) && filters[key]) {
      areFiltersActive = true;
      break;
    }
  }

  return areFiltersActive ? filters : null;
};

const Catalog = () => {
  const [activeFilters] = useFilter();
  const filters = processFilters(activeFilters);
  const { data: productsData, isLoading: areFtrdProductsLoading } =
    usePrismicRedux(PRODUCTS_NAME, PRODUCTS_QUERY, updateProducts);

  const {
    data: { results: categories },
    isLoading: areCategoriesLoading,
  } = usePrismicAPI(CATEGORIES_QUERY);

  return (
    <ContentContainer>
      <CatalogContainer>
        <Title>Our products</Title>
        <PageContent>
          <SideBar categories={categories} isLoading={areCategoriesLoading} />
          <List
            products={productsData}
            filters={filters}
            isLoading={areFtrdProductsLoading}
            pagination
          />
        </PageContent>
      </CatalogContainer>
    </ContentContainer>
  );
};

export default Catalog;
