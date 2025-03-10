import React from 'react';
import { ChangePassword as ChangePasswordForm } from 'modules/changePasswordCommon';
import { Roles } from 'modules/common/enums';
import { makeStyles, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: { padding: theme.spacing(8, 2, 2, 2) }
}));

export const ChangePassword = () => {
  const classes = useStyles();

  return (
    <Paper>
      <div className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={4}>
            <ChangePasswordForm role={Roles.user} />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
