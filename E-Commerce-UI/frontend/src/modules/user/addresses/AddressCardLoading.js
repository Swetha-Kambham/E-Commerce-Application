import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: 'none'
    }
  }
}));

export const AddressCardLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={36} />
    </div>
  );
};
