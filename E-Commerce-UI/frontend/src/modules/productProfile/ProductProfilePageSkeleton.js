import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { ProductDetailsSkeleton } from './ProductDetailsSkeleton';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  Skeleton: {
    // width: '90%',
    height: 400
  }
}));

export const ProductProfilePageSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid spacing={2} container>
        <Grid item xs={12} sm={10} md={6}>
          <Skeleton variant="rect" className={classes.Skeleton} />
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <ProductDetailsSkeleton />
        </Grid>
        {/* <Grid item xs={12} sm={10} md={6}>
          <ReviewSection />
        </Grid> */}
      </Grid>
    </div>
  );
};
