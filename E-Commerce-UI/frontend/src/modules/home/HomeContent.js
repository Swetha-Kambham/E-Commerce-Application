import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ProductCustomCategory } from 'modules/productCustomCategory';
import { ProductAdComponent } from './ProductAdComponent';
import { ExploreAllProducts } from './ExploreAllProducts';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: window.innerHeight - 320
  }
}));

export const HomeContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProductAdComponent />
      <ExploreAllProducts />
      <ProductCustomCategory />
    </div>
  );
};
