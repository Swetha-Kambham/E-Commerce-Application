import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  message: {
    fontStyle: 'italic'
  }
}));

export const NoDataMessage = ({ message }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.message} variant="body2">
      {message}
    </Typography>
  );
};

NoDataMessage.propTypes = {
  message: PropTypes.string
};
