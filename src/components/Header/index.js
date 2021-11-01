import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Search as SearchIcon,
  ShoppingBag as ShoppingIcon,
} from 'react-feather';
import MenuButton from '../MenuButton';

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

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SearchInput = styled.input`
  height: 30px;
  margin-top: 0.3rem;

  ::placeholder {
    color: #777676;
    font-style: italic;
  }
`;

const SearchButton = styled(Button)`
  width: 3rem;
  cursor: pointer;

  &:active {
    margin-left: 1px;
  }
`;

const Header = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = event => {
    const q = event.target.value;
    setSearchTerm(q);
  };

  const toSearch = () => {
    history.push(`/search?q=${searchTerm}`);
    setSearchTerm('');
  };

  const onSearchKeyDown = event => {
    if (event.key === 'Enter') {
      toSearch();
    }
  };

  return (
    <>
      <StyledHeader>
        <HeaderContainer>
          <MenuButton />
          <LogoContainer>
            <Title to="/">Asbesto</Title>
          </LogoContainer>
          <SearchContainer>
            <SearchInput
              value={searchTerm}
              placeholder="Search a product"
              onKeyDown={onSearchKeyDown}
              onChange={onSearchChange}
            />
            <SearchButton onClick={() => toSearch()}>
              <SearchIcon size={25} />
            </SearchButton>
          </SearchContainer>
          <Button>
            <ShoppingIcon size={24} />
          </Button>
        </HeaderContainer>
      </StyledHeader>
    </>
  );
};

export default Header;
