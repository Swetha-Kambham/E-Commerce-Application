import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export const PriceFormatter = ({ amount, currencySymbol }) => {
  return amount && currencySymbol ? (
    <Typography>{`${currencySymbol} ${amount}`}</Typography>
  ) : (
    <span>&ndash;</span>
  );
};

PriceFormatter.propTypes = {
  amount: PropTypes.number,
  currencySymbol: PropTypes.string
};
