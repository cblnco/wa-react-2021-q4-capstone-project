import React, { useState } from 'react';
import styled from 'styled-components';

const Menu = styled.button`
  width: 44px;
  height: 44px;
  text-align: center;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  .bar-1 {
    transform: ${({ isActive }) =>
      isActive ? 'translateY(2px) rotateZ(-45deg)' : 'translateY(-4px)'};
  }

  .bar-2 {
    opacity: ${({ isActive }) => (isActive ? 0 : 1)};
  }

  .bar-3 {
    transform: ${({ isActive }) =>
      isActive ? 'translateY(-4px) rotateZ(45deg)' : 'translateY(4px)'};
  }
`;

const Bar = styled.span`
  height: 3px;
  width: 100%;
  background-color: black;
  display: block;
  border-radius: 2px;
  transition: 0.3s ease;
`;

const MenuButton = ({ onClick = () => {} }) => {
  const [isActive] = useState(false);
  const barAmount = new Array(3).fill();

  return (
    <Menu isActive={isActive}>
      {barAmount.map((_, idx) => (
        <Bar key={`menu-bar-${idx + 1}`} className={`bar-${idx + 1}`} />
      ))}
    </Menu>
  );
};

export default MenuButton;
