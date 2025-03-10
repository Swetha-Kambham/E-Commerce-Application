import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export const ListTableSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton height={60} />
      <Skeleton height={60} animation={false} />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation={false} />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation={false} />
    </div>
  );
};

export default ListTableSkeleton;
