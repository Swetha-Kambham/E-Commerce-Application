import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SecuredRoute, Roles } from 'modules/common';
import React from 'react';
import { Product } from 'modules/productCommon';
import useAuthContext from 'modules/auth';
import { ProductsListTable } from './ProductsListTable';

export const SellerProductRoutes = () => {
  const { me } = useAuthContext();

  const match = useRouteMatch({
    path: `/seller/products`,
    strict: true,
    sensitive: true
  });

  return (
    <Switch>
      <SecuredRoute
        exact
        path={`${match.path}/`}
        component={ProductsListTable}
        redirectPath={`${match.path}/login`}
        role={Roles.seller}
      >
        <ProductsListTable sellerId={me.id} path={match.path} />
      </SecuredRoute>
      <SecuredRoute
        component={Product}
        path={`${match.path}/:productId`}
        redirectPath={`${match.path}/login`}
        role={Roles.seller}
      />
      <Route>
        <Redirect to="/page-not-found" />
      </Route>
    </Switch>
  );
};
