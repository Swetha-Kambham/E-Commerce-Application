import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { FlexView } from 'modules/common';

const useStyles = makeStyles((theme) => ({
  skeleton1: {
    width: '60%',
    height: theme.spacing(4)
  },
  skeleton2: {
    width: '10%',
    marginLeft: 'auto'
  },
  skeleton3: {
    width: '10%',
    height: theme.spacing(4)
  },
  skeleton4: {
    width: '80%',
    height: theme.spacing(4),
    marginLeft: theme.spacing(2)
  },
  Skeleton5: {
    width: '60%'
  },
  Skeleton6: {
    width: '40%'
  },
  Skeleton7: {
    width: '90%',
    height: theme.spacing(12)
  },
  Skeleton8: {
    width: '90%',
    height: theme.spacing(15)
  }
}));

export const ProductDetailsSkeleton = ({ isMobile }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.containerGrid}>
      <Grid item xs={12}>
        <FlexView>
          <Skeleton variant="rect" className={classes.skeleton1} />
          <Skeleton variant="rect" className={classes.skeleton2} />
        </FlexView>
      </Grid>
      <Grid item xs={12}>
        <FlexView>
          <Skeleton variant="rect" className={classes.skeleton3} />
          <Skeleton variant="rect" className={classes.skeleton4} />
        </FlexView>
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" className={classes.Skeleton6} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" className={classes.Skeleton5} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" className={classes.Skeleton6} />
      </Grid>
      <Grid className={classes.quantity} item xs={12}>
        <Skeleton variant="rect" className={classes.Skeleton5} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" className={classes.Skeleton6} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" className={classes.Skeleton6} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" className={classes.Skeleton7} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" className={classes.Skeleton8} />
      </Grid>
    </Grid>
  );
};

ProductDetailsSkeleton.propTypes = {
  isMobile: PropTypes.bool
};
