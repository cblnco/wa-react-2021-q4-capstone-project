import React from 'react';
import styled from 'styled-components';
import {
  Search as SearchIcon,
  ShoppingBag as ShoppingIcon,
} from 'react-feather';
import MenuButton from '../MenuButton';
import { Link } from 'react-router-dom';

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

const Header = () => {
  return (
    <>
      <StyledHeader>
        <HeaderContainer>
          <MenuButton />
          <LogoContainer>
            <Title to="/">Asbesto</Title>
          </LogoContainer>
          <Button>
            <SearchIcon size={25} />
          </Button>
          <Button>
            <ShoppingIcon size={24} />
          </Button>
        </HeaderContainer>
      </StyledHeader>
    </>
  );
};

export default Header;
