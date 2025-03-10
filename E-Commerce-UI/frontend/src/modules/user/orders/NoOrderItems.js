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

export const NoOrderItems = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.message} variant="h6">
        No order(s) have done yet.
      </Typography>
    </div>
  );
};
