import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIsScreenDown } from 'modules/common';
import { ImageCard } from './ImageCard';
import { ProductDetails } from './ProductDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: window.innerHeight - 320
  }
}));

export const ProductProfilePage = ({ productUnit }) => {
  const classes = useStyles();
  const isMobile = useIsScreenDown(800);

  return (
    <div className={classes.root}>
      <Grid spacing={2} container>
        <Grid item xs={12} sm={10} md={6}>
          <ImageCard productUnit={productUnit} isMobile={isMobile} />
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <ProductDetails productUnit={productUnit} isMobile={isMobile} />
        </Grid>
      </Grid>
    </div>
  );
};

ProductProfilePage.propTypes = {
  productUnit: PropTypes.objectOf(PropTypes.any)
};
