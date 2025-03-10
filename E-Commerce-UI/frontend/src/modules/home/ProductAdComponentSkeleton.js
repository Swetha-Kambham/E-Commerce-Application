import React from 'react';
import { makeStyles, Card } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: { width: '100%', padding: theme.spacing(2) }
}));

export const ProductAdComponentSkeleton = () => {
  const classes = useStyles();
  return (
    <Card>
      <Skeleton
        height={500}
        variant="rect"
        animation="wave"
        className={classes.root}
      />
    </Card>
  );
};
