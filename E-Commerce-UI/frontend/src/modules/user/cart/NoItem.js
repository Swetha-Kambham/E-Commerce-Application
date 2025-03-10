import { Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(10),
    padding: theme.spacing(2)
  },
  message: {
    fontStyle: 'italic'
  }
}));

export const NoItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.message} variant="h6">
        There are no items in your cart.
      </Typography>
    </div>
  );
};
