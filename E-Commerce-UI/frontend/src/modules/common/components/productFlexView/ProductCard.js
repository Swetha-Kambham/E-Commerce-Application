import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, GridListTile, CardMedia, Typography } from '@material-ui/core';
import { DiscountMoneyFormatter } from '../DiscountMoneyFormatter';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingRight: theme.spacing(2)
  },
  image: {
    height: theme.spacing(30),
    width: theme.spacing(30),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: theme.spacing(15)
    }
  }
}));

export const ProductCard = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <GridListTile className={classes.tile}>
        <CardMedia
          alt="Not available"
          tabIndex={0}
          className={classes.image}
          image="http://127.0.0.1:8887/craft1.jpg"
        />
      </GridListTile>
      <div>
        <Typography>Product Name</Typography>
        <DiscountMoneyFormatter />
      </div>
    </Paper>
  );
};
