import React from 'react';
import styled from 'styled-components';

const SpecsContainer = styled.div`
  display: grid;
  grid-auto-flow: dense;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 25rem));
  margin-top: 1.5rem;
  margin-bottom: 7rem;
`;

const SpecColumn = styled.div`
  background-color: #d8d6d2;
  padding: 2.5rem;
`;

const MainTitle = styled.div`
  font-size: 31px;
  margin-bottom: 0.2rem;
`;

const SpecContainer = styled.div`
  margin: 1rem;
`;

const SpecTitle = styled.div`
  font-size: 16px;
  color: #4d4a46;
  font-weight: bold;
`;

const SpecValue = styled.div`
  color: #7f7f7f;
  font-size: 16px;
`;

const getColumns = (specs) => {
  if (specs.length <= 5) {
    return { firstColumn: specs, secondColumn: [] };
  }

  const half = Math.ceil(specs.length / 2);

  return {
    firstColumn: specs.slice(0, half),
    secondColumn: specs.slice(-half),
  };
};

const renderSpec = ({ spec_name, spec_value }) => (
  <SpecContainer key={`product-spec-${spec_name}`}>
    <SpecTitle>{spec_name}:</SpecTitle>
    <SpecValue>{spec_value}</SpecValue>
  </SpecContainer>
);

const Specs = ({ specs }) => {
  const { firstColumn, secondColumn } = getColumns(specs);
  return (
    <>
      <MainTitle>Specefications:</MainTitle>
      <SpecsContainer>
        <SpecColumn>{firstColumn.map(renderSpec)}</SpecColumn>
        {secondColumn.length > 0 && (
          <SpecColumn>{secondColumn.map(renderSpec)}</SpecColumn>
        )}
      </SpecsContainer>
    </>
  );
};

export default Specs;
