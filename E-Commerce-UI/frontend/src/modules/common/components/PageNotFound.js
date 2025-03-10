import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  }
}));

export const PageNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">Page not found :(</Typography>
      <Typography variant="body1">
        Maybe the page you are looking for has been removed, or you typed in the
        wrong URL
      </Typography>
    </div>
  );
};
