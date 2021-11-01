import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Catalog from '../Products/Catalog';
import Detail from '../Products/Detail';

const MainPage = () => {
  return (
    <Switch>
      <Route exact path={['/', '/home']}>
        <Home />
      </Route>
      <Route path="/products">
        <Catalog />
      </Route>
      <Route path="/product/:productId">
        <Detail />
      </Route>
    </Switch>
  );
};

export default MainPage;
