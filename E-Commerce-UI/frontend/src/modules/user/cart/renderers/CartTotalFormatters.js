import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  totalValue: {
    fontWeight: 600
  }
}));

export const CartTotalFormatters = ({ record, field }) => {
  const classes = useStyles();
  const { amount, currency } = record[field] || {};

  const priceString = `${currency?.symbol} ${parseFloat(amount).toFixed(2)}`;

  return (
    <Typography variant="subtitle1" className={classes.totalValue}>
      {priceString}
    </Typography>
  );
};

CartTotalFormatters.propTypes = {
  record: PropTypes.object,
  field: PropTypes.string
};
