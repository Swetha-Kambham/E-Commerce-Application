import React, { useCallback } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { resource } from 'modules/resources';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    width: 'calc(100% - 16px)'
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}));

const { admin } = resource;

export const AdminHome = () => {
  const classes = useStyles();
  const history = useHistory();

  const onClick = useCallback(
    (linkKey) => () => {
      history.push(`/admin/${linkKey}`);
    },
    [history]
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Button
            color="primary"
            className={classes.button}
            onClick={onClick('users')}
          >
            {admin.users}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            color="primary"
            className={classes.button}
            onClick={onClick('products')}
          >
            {admin.products}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            color="primary"
            className={classes.button}
            onClick={onClick('product-view')}
          >
            Product View
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            color="primary"
            className={classes.button}
            onClick={onClick('sellers')}
          >
            {admin.sellers}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            color="primary"
            onClick={onClick('social-medias')}
            className={classes.button}
          >
            {admin.socialMedias}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            color="primary"
            className={classes.button}
            onClick={onClick('categories')}
          >
            {admin.categories}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            color="primary"
            className={classes.button}
            onClick={onClick('orders')}
          >
            {admin.orders}
          </Button>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            color="primary"
            className={classes.button}
            onClick={onClick('reviews')}
          >
            {admin.reviews}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
