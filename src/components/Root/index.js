import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../Landing';
import Catalog from '../Products/Catalog';
import Detail from '../Products/Detail';
import Search from '../Search';

const Root = () => {
  return (
    <Switch>
      <Route exact path={['/', '/home']}>
        <Landing />
      </Route>
      <Route path="/products">
        <Catalog />
      </Route>
      <Route path="/product/:productId">
        <Detail />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
    </Switch>
  );
};

export default Root;
