import React from 'react';
import { Typography, TableRow, Paper, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { Review } from './Review';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '50%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.between('sm', 'md')]: {
      maxWidth: '70%',
      marginTop: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      marginTop: theme.spacing(4)
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(-12)
    }
  },
  paper: {
    display: 'table',
    width: '100%'
  },
  overAllRating: {
    display: 'flex',
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  rating: {
    marginLeft: theme.spacing(1),
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  row: {
    padding: theme.spacing(2, 0, 2, 0)
  },
  buttonContainer: {
    display: 'flex'
  },
  pageInfo: {
    margin: 'auto'
  }
}));

const test = [1, 2, 3, 4, 5, 6, 7];

export const ReviewSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.overAllRating}>
        <Typography variant="h6">Customer Reviews</Typography>
        <Rating
          className={classes.rating}
          name="product-rating"
          defaultValue={2.5}
          precision={0.1}
          readOnly
        />
      </span>
      <Paper className={classes.paper}>
        {test.map((r) => (
          <TableRow className={classes.row} key={r}>
            <Review />
          </TableRow>
        ))}
        <div className={classes.buttonContainer}>
          <Typography className={classes.pageInfo} variant="body2">
            1 of 4
          </Typography>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};
