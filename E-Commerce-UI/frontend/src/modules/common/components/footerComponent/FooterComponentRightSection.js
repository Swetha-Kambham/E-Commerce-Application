import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#ffffff',
    background: 'transparent',
    border: '1px solid #B2B2B2',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    marginTop: theme.spacing(2)
  }
}));

export const FooterComponentRightSection = () => {
  const classes = useStyles();
  return (
    <div>
      <Button variant="outlined" classes={classes}>
        Download our App
      </Button>
    </div>
  );
};
