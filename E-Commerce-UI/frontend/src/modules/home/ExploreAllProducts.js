import { Paper, makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';
import { LinkButton } from 'modules/common/components/LinkButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  button: {},
  buttonLabel: {
    ...theme.typography.h6,
    textTransform: 'none',
    color: theme.palette.primary.main
  }
}));

export const ExploreAllProducts = () => {
  const classes = useStyles();
  const buttonClasses = useMemo(
    () => ({ root: classes.button, label: classes.buttonLabel }),
    [classes.button, classes.buttonLabel]
  );
  return (
    <Paper className={classes.paper}>
      <LinkButton label="Explore All" to="/explore" classes={buttonClasses} />
    </Paper>
  );
};
