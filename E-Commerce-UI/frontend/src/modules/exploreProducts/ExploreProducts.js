import { ProductGridView } from 'modules/infiniteProductGridView';
import React from 'react';
import { HeaderComponent, FooterComponent } from 'modules/common';
import {
  Redirect,
  useRouteMatch,
  Switch,
  Route,
  useLocation
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  productGridContainer: {
    minHeight: window.innerHeight - 320
  }
}));

const useQuery = ({ search }) => {
  return new URLSearchParams(search);
};

export const ExploreProducts = () => {
  const classes = useStyles();
  const match = useRouteMatch({
    path: '/explore',
    strict: true,
    sensitive: true
  });

  const { search } = useLocation();
  const query = useQuery({ search });

  const category = query.get('category');
  const textSearch = query.get('text');

  return (
    <Switch>
      <Route exact path={`${match?.path}/`}>
        <HeaderComponent />
        <div className={classes.productGridContainer}>
          <ProductGridView category={category} textSearch={textSearch} />
        </div>
        <FooterComponent />
      </Route>
      <Route>
        <Redirect to="/page-not-found" />
      </Route>
    </Switch>
  );
};

ExploreProducts.propTypes = {};

export default ExploreProducts;
