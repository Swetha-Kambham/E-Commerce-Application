import React from 'react';
import { Typography, TableCell } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ratingContainer: {
    display: 'flex'
  },
  cell: {
    borderBottom: 'none'
  },
  rating: {
    marginLeft: theme.spacing(2),
    marginBottom: 'auto',
    fontSize: '1rem'
  }
}));

export const Review = () => {
  const classes = useStyles();

  return (
    <TableCell className={classes.cell}>
      <span className={classes.ratingContainer}>
        <Typography variant="subtitle2">Vibhay Nischal</Typography>
        <Rating
          className={classes.rating}
          name="product-rating"
          defaultValue={2.5}
          precision={0.1}
          readOnly
        />
      </span>
      <Typography variant="body2">This product is really good</Typography>
    </TableCell>
  );
};
