import React from 'react';
import styled from 'styled-components';
import useFilter from '../../hooks/useFilter';

const MenuContainer = styled.div``;

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
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

const SideBar = ({ categories = [] }) => {
  const [activeFilters, setActiveFilters] = useFilter();

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
        {categories.map(({ id, data: { name } }) => (
          <Item
            key={`category-list-${id}`}
            isActive={activeFilters[id]}
            onClick={() => onFilterClick(id)}
          >
            {name}
          </Item>
        ))}
      </UnorderedList>
    </MenuContainer>
  );
};

export default SideBar;
