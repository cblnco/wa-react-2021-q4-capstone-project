import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  width: 100%;
  height: 4rem;
  padding-top: 2rem;
  background-color: #ebeae8;
  font-style: italic;
  text-align: center;
  bottom: -5rem;
  position: absolute;
`;

const Footer = () => (
  <StyledFooter>
    Ecommerce created during Wizeline’s Academy React Bootcamp
  </StyledFooter>
);

export default Footer;
