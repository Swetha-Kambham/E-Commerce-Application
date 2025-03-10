import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SecuredRoute, Roles } from 'modules/common';
import React from 'react';
import { Address } from './addresses';
import { UserPersonalInfo } from './personalInfo';
import { Cart } from './cart';
import { Orders } from './orders';
import { ChangePassword } from './changePassword';

export const UserRoutes = () => {
  const match = useRouteMatch({
    path: '/me',
    strict: true,
    sensitive: true
  });

  return (
    <>
      <Switch>
        <SecuredRoute
          exact
          path={`${match.path}/`}
          redirectPath="/login"
          component={UserPersonalInfo}
          role={Roles.user}
        />
        <SecuredRoute
          path={`${match.path}/addresses`}
          redirectPath="/login"
          component={Address}
          role={Roles.user}
        />
        <SecuredRoute
          path={`${match.path}/cart`}
          redirectPath="/login"
          component={Cart}
          role={Roles.user}
        />
        <SecuredRoute
          path={`${match.path}/orders`}
          redirectPath="/login"
          component={Orders}
          role={Roles.user}
        />
        <SecuredRoute
          path={`${match.path}/change-password`}
          redirectPath="/login"
          component={ChangePassword}
          role={Roles.user}
        />
        <Route>
          <Redirect to="/page-not-found" />
        </Route>
      </Switch>
    </>
  );
};
