import React from 'react';
import { Switch, Route } from 'react-router-dom';
import categoryData from '../../mocks/en-us/product-categories.json';
import productData from '../../mocks/en-us/products.json';
import ContentContainer from '../ContentContainer';
import Home from '../Home';
import Catalog from '../Products/Catalog';

const MainPage = () => {
  return (
    <Switch>
      <Route exact path={['/', '/home']}>
        <Home />
      </Route>
      <Route path="/catalog">
        <ContentContainer>
          <Catalog
            products={productData.results}
            categories={categoryData.results}
          />
        </ContentContainer>
      </Route>
    </Switch>
  );
};

export default MainPage;
