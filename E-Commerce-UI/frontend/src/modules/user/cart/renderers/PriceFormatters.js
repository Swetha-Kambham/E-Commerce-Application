import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

export const PriceFormatters = ({ record, field }) => {
  const { amount, currency } = record[field] || {};

  const priceString = `${currency?.symbol} ${parseFloat(amount).toFixed(2)}`;

  return <Typography>{priceString}</Typography>;
};

PriceFormatters.propTypes = {
  record: PropTypes.object,
  field: PropTypes.string
};
