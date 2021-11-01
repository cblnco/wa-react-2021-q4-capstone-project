import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Catalog from '../Products/Catalog';

const MainPage = () => {
  return (
    <Switch>
      <Route exact path={['/', '/home']}>
        <Home />
      </Route>
      <Route path="/products">
        <Catalog />
      </Route>
    </Switch>
  );
};

export default MainPage;
