import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { Product } from 'modules/productCommon';
import { ProductListTable } from './ProductListTable';

export const Products = () => {
  const match = useRouteMatch({
    path: '/admin/products',
    strict: true,
    sensitive: true
  });

  return (
    <Switch>
      <Route exact path={`${match.path}/`}>
        <ProductListTable path={match.path} />
      </Route>
      <Route path={`${match.path}/:productId/view`}>
        <Product editable={false} />
      </Route>
      <Route>
        <Redirect to="/page-not-found" />
      </Route>
    </Switch>
  );
};
