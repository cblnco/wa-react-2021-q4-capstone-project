import React from 'react';
import { usePrismicAPI, SEARCH_QUERY } from '../../utils/hooks/usePrismicAPI';
import useQuery from '../../utils/hooks/useQuery';
import ContentContainer from '../ContentContainer';
import styled from 'styled-components';
import List from '../Products/List';

const SearchContainer = styled.div`
  margin-top: 4rem;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 3rem;
`;

const Search = () => {
  const query = useQuery();
  const searchTerm = query.get('q');
  const searchQuery = SEARCH_QUERY.replace('{searchTerm}', searchTerm);
  const { data, isLoading } = usePrismicAPI(searchQuery);

  return (
    <ContentContainer>
      <SearchContainer>
        <Title>Search results</Title>
        <List
          products={data}
          isLoading={isLoading}
          pagination
          customMessage={`No results found for '${searchTerm}'.`}
        />
      </SearchContainer>
    </ContentContainer>
  );
};

export default Search;
