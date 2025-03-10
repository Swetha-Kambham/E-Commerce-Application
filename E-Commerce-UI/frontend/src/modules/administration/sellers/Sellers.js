import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { SellerProfile } from './SellerProfile';
import { SellerListTable } from './SellerListTable';

export const Sellers = () => {
  const match = useRouteMatch({
    path: '/admin/sellers',
    strict: true,
    sensitive: true
  });

  return (
    <Switch>
      <Route exact path={`${match.path}/`}>
        <SellerListTable path={match.path} />
      </Route>
      <Route path={`${match.path}/:sellerId/view`}>
        <SellerProfile />
      </Route>
      <Route>
        <Redirect to="/page-not-found" />
      </Route>
    </Switch>
  );
};
