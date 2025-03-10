import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from 'modules/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    padding: theme.spacing(2)
  },
  name: {
    marginLeft: theme.spacing(2)
  }
}));

export const UserNameSection = () => {
  const { me } = useAuthContext();
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <PersonIcon />
      <span className={classes.name}>
        <Typography variant="body2">Hi,</Typography>
        <Typography variant="h6">{me.name}</Typography>
      </span>
    </Paper>
  );
};
