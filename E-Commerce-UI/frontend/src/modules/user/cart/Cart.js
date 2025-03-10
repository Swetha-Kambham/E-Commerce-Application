import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import { CartListTableContext } from './CartListTableContext';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export const Cart = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <CartListTableContext />
      </Paper>
    </div>
  );
};
