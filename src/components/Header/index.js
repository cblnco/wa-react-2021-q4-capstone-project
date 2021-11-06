import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Search as SearchIcon,
  ShoppingBag as ShoppingIcon,
  X,
} from 'react-feather';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  background: whitesmoke;
  z-index: 2;
  box-shadow: 4px 3px 21px -6px rgba(0, 0, 0, 0.32);
`;

const HeaderContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  margin: 0 auto;
  min-height: 2rem;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

const Title = styled(Link)`
  font-size: 35px;
  color: black;
  cursor: pointer;
  text-decoration: none;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: not-allowed;
  margin: 0 0.3rem;
`;

const SearchBar = styled.div`
  display: flex;
  padding: 10px 20px;
  margin: 0 auto;
  position: absolute;
  background-color: whitesmoke;
  width: 100%;
  transition: all 0.3s ease-in;
  top: ${({ isVisible }) => (isVisible ? '0rem' : '-4rem')};
  height: 2.6rem;
  justify-content: center;
  z-index: 1;
`;

const SearchInput = styled.input`
  margin: 0 1rem;
  width: 29rem;
  height: 2.2rem;
  border: 0;
  color: #3d3b39;
  border-bottom: 2px solid #d5bf9d;
  background-color: transparent;
  font-size: 20px;

  *:foculs {
    outline: none;
  }

  ::placeholder {
    color: #777676;
    font-style: italic;
  }
`;

const SearchButton = styled(Button)`
  width: 3rem;
  cursor: pointer;
`;

const Header = () => {
  const history = useHistory();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = event => {
    const q = event.target.value;
    setSearchTerm(q);
  };

  const toSearch = () => {
    if (searchTerm !== '') {
      history.push(`/search?q=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const onSearchKeyDown = event => {
    if (event.key === 'Enter') {
      toSearch();
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(v => !v);
    setSearchTerm('');
  };

  return (
    <StyledHeader>
      <SearchBar isVisible={isSearchVisible}>
        <LogoContainer>
          <SearchIcon
            style={{
              padding: '5px',
              cursor: 'pointer',
              color: '#6b665c',
              strokeWidth: '1px',
            }}
            size={35}
            onClick={toSearch}
          />
          <SearchInput
            value={searchTerm}
            placeholder="Search a product"
            onKeyDown={onSearchKeyDown}
            onChange={onSearchChange}
          />
          <X
            size={35}
            style={{
              padding: '5px',
              color: '#6b665c',
              cursor: 'pointer',
              strokeWidth: '1px',
            }}
            onClick={toggleSearchBar}
          />
        </LogoContainer>
      </SearchBar>
      <HeaderContainer>
        <LogoContainer>
          <Title to="/">Asbesto</Title>
        </LogoContainer>
        <SearchButton onClick={toggleSearchBar}>
          <SearchIcon style={{ color: '#6b665c' }} size={25} />
        </SearchButton>
        <Button>
          <ShoppingIcon style={{ color: '#6b665c' }} size={24} />
        </Button>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
