import React from 'react';
import { useParams } from 'react-router';
import {
  usePrismicAPI,
  PRODUCT_QUERY,
} from '../../../utils/hooks/usePrismicAPI';
import ContentContainer from '../../ContentContainer';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 30px;
  margin-top: 4rem;
  margin-bottom: 3rem;
`;

const Detail = () => {
  const { productId } = useParams();
  const query = PRODUCT_QUERY.replace('{productId}', productId);
  const { data, isLoading } = usePrismicAPI(query);

  if (isLoading) {
    return null;
  }

  const {
    data: { name },
  } = data.results[0];

  return (
    <ContentContainer>
      <Title>{name}</Title>
      <span>In progress</span>
    </ContentContainer>
  );
};

export default Detail;
