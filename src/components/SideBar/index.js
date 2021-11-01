import React, { useEffect } from 'react';
import styled from 'styled-components';
import useFilter from '../../utils/hooks/useFilter';
import useQuery from '../../utils/hooks/useQuery';

const MenuContainer = styled.div``;

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ClearButton = styled.button`
  width: 77%;
  margin-top: 2rem;
  background-color: #f2e9da;
  border: none;
  cursor: pointer;
  color: #6f6969;
  font-size: 20px;
  padding: 0.5rem;
  border-radius: 3px;
  box-shadow: 2px 3px 5px -4px rgba(0, 0, 0, 0.32);
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  border: solid 1px #e0e0e0;

  &:hover {
    border: solid 1px #d4d1d1;
  }

  &:active {
    margin-left: 1px;
    background-color: #dedbd5;
  }
`;

const Item = styled.li`
  padding: 0.5rem 2rem;
  font-size: 20px;
  margin: 0.5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border-bottom: solid 3px
    ${({ isActive }) => (isActive ? '#d0c0a7' : 'transparent')};
`;

const Title = styled.h3`
  font-size: 23px;
  margin: 0px;
  padding: 0 2rem;
`;

const verifyUsedFilters = filters => {
  for (let filterId in filters) {
    if (filters.hasOwnProperty(filterId) && filters[filterId]) {
      return true;
    }
  }

  return false;
};

const SideBar = ({ categories = [], isLoading }) => {
  const query = useQuery();
  const [activeFilters, setActiveFilters] = useFilter();
  const areFiltersActive = verifyUsedFilters(activeFilters);

  useEffect(() => {
    if (categories.length > 0) {
      const paramName = query.get('category');
      const isActive = activeFilters[paramName] || false;

      for (let category of categories) {
        const slug = category.slugs[0];

        if (paramName === slug) {
          setActiveFilters(filters => ({ ...filters, [paramName]: !isActive }));
          break;
        }
      }
    }

    return () => setActiveFilters({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const onFilterClick = filterId => {
    const isActive = activeFilters[filterId] || false;
    setActiveFilters(filters => ({
      ...filters,
      [filterId]: !isActive,
    }));
  };

  return (
    <MenuContainer>
      <Title>Filter by category</Title>
      <UnorderedList>
        {!isLoading && categories.length > 0 && (
          <>
            {categories.map(({ id, slugs, data: { name } }) => (
              <Item
                key={`category-list-${id}`}
                isActive={activeFilters[slugs[0]]}
                onClick={() => onFilterClick(slugs[0])}
              >
                {name}
              </Item>
            ))}
            {areFiltersActive && (
              <ButtonContainer>
                <ClearButton onClick={() => setActiveFilters({})}>
                  Clear filters
                </ClearButton>
              </ButtonContainer>
            )}
          </>
        )}
      </UnorderedList>
    </MenuContainer>
  );
};

export default SideBar;
