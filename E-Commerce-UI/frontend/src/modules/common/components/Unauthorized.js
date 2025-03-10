import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  }
}));

export const Unauthorized = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">Unuthorized :(</Typography>
      <Typography variant="body1">
        You are not authorized to view requested page/url
      </Typography>
    </div>
  );
};
