import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SecuredRoute, Roles } from 'modules/common';
import React from 'react';
import { SocialMedias } from './socialMedias';
import { Users } from './users';
import { Products } from './products';
import { Sellers } from './sellers';
import { Categories } from './categories';
import { Orders } from './orders';
import { Reviews } from './reviews';
import { ProductView } from './product-view';
import { AdminHome } from './AdminHome';

export const AdminRoute = () => {
  const match = useRouteMatch({
    path: '/admin',
    strict: true,
    sensitive: true
  });

  return (
    <Switch>
      <SecuredRoute
        exact
        path={`${match.path}/`}
        component={AdminHome}
        redirectPath="/admin/login"
        role={Roles.admin}
      />
      <SecuredRoute
        path={`${match.path}/social-medias`}
        component={SocialMedias}
        redirectPath={`${match.path}/login`}
        role={Roles.admin}
      />
      <SecuredRoute
        path={`${match.path}/users`}
        component={Users}
        redirectPath={`${match.path}/login`}
        role={Roles.admin}
      />
      <SecuredRoute
        path={`${match.path}/products`}
        component={Products}
        redirectPath={`${match.path}/login`}
        role={Roles.admin}
      />
      <SecuredRoute
        path={`${match.path}/product-view`}
        component={ProductView}
        redirectPath={`${match.path}/login`}
        role={Roles.admin}
      />
      <SecuredRoute
        path={`${match.path}/sellers`}
        component={Sellers}
        redirectPath={`${match.path}/login`}
        role={Roles.admin}
      />
      <SecuredRoute
        path={`${match.path}/categories`}
        component={Categories}
        redirectPath={`${match.path}/login`}
        role={Roles.admin}
      />
      <SecuredRoute
        path={`${match.path}/orders`}
        component={Orders}
        redirectPath={`${match.path}/login`}
        role={Roles.admin}
      />
      <SecuredRoute
        path={`${match.path}/reviews`}
        component={Reviews}
        redirectPath={`${match.path}/login/`}
        role={Roles.admin}
      />
      <Route>
        <Redirect to="/page-not-found" />
      </Route>
    </Switch>
  );
};
