import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SecuredRoute, Roles } from 'modules/common';
import React from 'react';
import { tabs } from './tabs';

export const SellerRoutes = () => {
  const match = useRouteMatch({
    path: '/seller',
    strict: true,
    sensitive: true
  });

  return (
    <>
      <Switch>
        <SecuredRoute
          exact
          path={`${match.path}/`}
          component={tabs.dashboard.renderer}
          redirectPath={`${match.path}/login`}
          role={Roles.seller}
        >
          <Redirect to={`${match.path}/profile`} />
        </SecuredRoute>
        <SecuredRoute
          component={tabs.profile.renderer}
          path={`${match.path}/profile`}
          redirectPath={`${match.path}/login`}
          role={Roles.seller}
        />
        <SecuredRoute
          component={tabs.products.renderer}
          path={`${match.path}/products`}
          redirectPath={`${match.path}/login`}
          role={Roles.seller}
        />
        <SecuredRoute
          component={tabs.orders.renderer}
          path={`${match.path}/orders`}
          redirectPath={`${match.path}/login`}
          role={Roles.seller}
        />
        <SecuredRoute
          component={tabs.reviews.renderer}
          path={`${match.path}/reviews`}
          redirectPath={`${match.path}/login`}
          role={Roles.seller}
        >
          <Redirect to={`${match.path}/profile`} />
        </SecuredRoute>
        <Route>
          <Redirect to="/page-not-found" />
        </Route>
      </Switch>
    </>
  );
};
