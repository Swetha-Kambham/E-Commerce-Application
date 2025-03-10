import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { FooterComponentLeftSection } from './FooterComponentLeftSection';
import { FooterComponentMiddleSection } from './FooterComponentMiddleSection';
import { FooterComponentRightSection } from './FooterComponentRightSection';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#262627',
    display: 'flex',
    padding: theme.spacing(2)
  },
  divider: {
    borderLeft: '2px solid white',
    [theme.breakpoints.up('md')]: {
      borderRight: '2px solid white'
    }
  }
}));

export const FooterComponent = () => {
  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <FooterComponentLeftSection />
        </Grid>
        <Grid className={classes.divider} item xs={6} md={4}>
          <FooterComponentMiddleSection />
        </Grid>
        <Grid item xs={12} md={4}>
          <FooterComponentRightSection />
        </Grid>
      </Grid>
    </Paper>
  );
};
