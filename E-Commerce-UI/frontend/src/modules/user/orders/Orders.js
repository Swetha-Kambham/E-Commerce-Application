import React from 'react';
import { makeStyles } from '@material-ui/core';
import { OrderList } from './OrderList';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export const Orders = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OrderList />
    </div>
  );
};
