import React from 'react';
import { Paper, makeStyles, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { ProductLoadingSkeleton } from 'modules/infiniteProductGridView/ProductLoadingSkeleton';
import { useColumnCapacity } from 'modules/common/hooks/useScreenSize';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
  paper: {
    margin: theme.spacing(2)
  },
  skeleton: {
    margin: theme.spacing(0, 2, 1, 2),
    width: theme.spacing(35)
  },
  textSkeleton: {
    margin: theme.spacing(0, 2, 0, 2),
    width: '40%'
  },
  buttonSkeleton: {
    margin: 'auto',
    width: theme.spacing(15)
  }
}));

export const ProductCustomCategorySkeleton = () => {
  return (
    <div>
      {[1, 2, 3].map((item) => {
        return <ProductCustomCategoryItemSkeleton key={item} />;
      })}
    </div>
  );
};

export const ProductCustomCategoryItemSkeleton = () => {
  const classes = useStyles();
  const { capacity } = useColumnCapacity();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton
            className={classes.textSkeleton}
            height={50}
            variant="text"
          />
        </Grid>
        <Grid item xs={12}>
          <ProductLoadingSkeleton cols={capacity} />;
        </Grid>
      </Grid>
    </Paper>
  );
};
