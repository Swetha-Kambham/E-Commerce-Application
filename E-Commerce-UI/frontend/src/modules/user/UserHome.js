import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useIsScreenDown } from 'modules/common';
import { MenuSection } from './MenuSection';
import { UserRoutes } from './UserRoutes';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2), minHeight: window.innerHeight - 320 }
}));

export const UserHome = () => {
  const classes = useStyles();
  const isMobile = useIsScreenDown('sm');

  return (
    <div className={classes.root}>
      <Grid container spacing={isMobile ? 0 : 2}>
        {!isMobile ? (
          <Grid item xs={1} md={3}>
            <MenuSection />
          </Grid>
        ) : null}
        <Grid item xs={12} md={9}>
          <UserRoutes />
        </Grid>
      </Grid>
    </div>
  );
};
