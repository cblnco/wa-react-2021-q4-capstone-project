import React, { useState, useEffect } from 'react';
import List from '../List';
import styled from 'styled-components';
import useFilter from '../../../hooks/useFilter';
import Skeleton from '../Skeleton';
import SideBar from '../../SideBar';

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

const Catalog = ({ products = [], categories = [] }) => {
  const [activeFilters] = useFilter();
  const [isLoading, setIsLoading] = useState(true);
  const filters = processFilters(activeFilters);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(value => !value), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <CatalogContainer>
      <Title>Our products</Title>
      {isLoading ? (
        <Skeleton amount={7} />
      ) : (
        <PageContent>
          <SideBar categories={categories} />
          <List products={products} filters={filters} pagination />
        </PageContent>
      )}
    </CatalogContainer>
  );
};

export default Catalog;
