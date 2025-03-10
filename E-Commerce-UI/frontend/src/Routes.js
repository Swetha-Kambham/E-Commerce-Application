import React from 'react';
import { Home } from 'modules/home';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Administration } from 'modules/administration';
import {
  PageNotFound,
  SecuredRoute,
  TestAuthorization,
  Unauthorized
} from 'modules/common/components';
import { Roles } from 'modules/common/enums';
import { ProductProfile } from 'modules/productProfile';
import Login from 'modules/login';
import { Registration } from 'modules/registration';
import { ResetPassword } from 'modules/resetPassword';
import { Seller } from 'modules/seller';
import { Checkout } from 'modules/checkout';
import { User } from 'modules/user';
import { ExploreProducts } from 'modules/exploreProducts';
import { OrderConfirmation } from 'modules/orderConfirmation';
import { TermsofUse, PrivacyPolicy, AboutUs } from 'modules/pages';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/test" component={TestAuthorization} />
      <Route path="/terms-of-use" component={TermsofUse} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/explore" component={ExploreProducts} />
      <SecuredRoute
        path="/admin"
        component={Administration}
        redirectPath="/admin/login"
        role={Roles.admin}
      />
      <SecuredRoute
        path="/seller"
        redirectPath="/seller/login"
        component={Seller}
        role={Roles.seller}
      />
      <SecuredRoute
        path="/me"
        redirectPath="/login"
        component={User}
        role={Roles.user}
      />
      <Route path="/login" component={Login} />
      <SecuredRoute
        path="/checkout/:draftId"
        component={Checkout}
        role={Roles.user}
        redirectPath="/login"
      />
      <SecuredRoute
        path="/order/confirmation"
        component={OrderConfirmation}
        role={Roles.user}
        redirectPath="/login"
      />
      <Route path="/create-account" component={Registration} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/product/:slug" component={ProductProfile} />
      <Route path="/unauthorized" component={Unauthorized} />
      <Route path="/page-not-found" component={PageNotFound} />
      <Route>
        <Redirect to="/page-not-found" />
      </Route>
    </Switch>
  );
};

export default Routes;
