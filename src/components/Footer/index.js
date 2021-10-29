import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 30px;
  background-color: #ebeae8;
  padding: 2em;
  font-style: italic;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      Ecommerce created during Wizeline’s Academy React Bootcamp
    </StyledFooter>
  );
};

export default Footer;
