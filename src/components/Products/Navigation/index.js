import React from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateProducts } from '../../../redux/slices/products';
import fetchData from '../../../utils/fetchData';

const NavigationContent = styled.div`
  display: flex;
  margin: 0 auto;
`;

const NumberContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PageNumber = styled.button`
  font-size: 23px;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  width: 3rem;
  background-color: ${({ isActive }) => (isActive ? '#e4dccb' : '#deddda')};
  border: none;
  color: ${({ isActive }) => (isActive ? '#403e3e' : '#ababab')};
  transition: 0.2s ease-in-out;
`;

const NavButton = styled.div`
  background-color: transparent;
  border: none;
  color: ${({ isActive }) => (isActive ? '#403e3e' : '#ababab')};
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'not-allowed')};
  transition: 0.2s ease-in-out;
`;

const Navigation = ({ currentPage, totalPages, nextPage, prevPage }) => {
  const dispatch = useDispatch();
  const pages = new Array(totalPages).fill();

  const handleClick = async query => {
    if (!query) {
      return;
    }

    dispatch(updateProducts({ data: {}, isLoading: true }));
    const response = await fetchData(query);
    dispatch(updateProducts({ data: response, isLoading: false }));
  };

  return (
    <NavigationContent>
      <NavButton isActive={!!prevPage} onClick={() => handleClick(prevPage)}>
        <ArrowLeft size={26} />
      </NavButton>
      {pages.map((_, idx) => {
        const pageNumber = idx + 1;
        const isActive = currentPage === pageNumber;
        return (
          <NumberContainer key={`number-container-${idx}`}>
            <PageNumber key={`page-navigator-${idx}`} isActive={isActive}>
              {pageNumber}
            </PageNumber>
          </NumberContainer>
        );
      })}
      <NavButton isActive={!!nextPage} onClick={() => handleClick(nextPage)}>
        <ArrowRight size={26} />
      </NavButton>
    </NavigationContent>
  );
};

export default Navigation;
