import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { width: '100%', display: 'flex', height: theme.spacing(50) },
  label: {
    margin: 'auto'
  }
}));

export const FullPageLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="h6">
        Loading...
      </Typography>
    </div>
  );
};
