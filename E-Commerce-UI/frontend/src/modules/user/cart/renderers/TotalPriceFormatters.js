import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const priceField = 'price';
const quantityField = 'quantity';

export const TotalPriceFormatters = ({ record }) => {
  const { amount, currency } = record[priceField] || {};
  const quantity = record[quantityField];

  const priceString = `${currency?.symbol} ${(
    parseInt(quantity) * parseFloat(amount)
  ).toFixed(2)}`;

  return <Typography>{priceString}</Typography>;
};

TotalPriceFormatters.propTypes = {
  record: PropTypes.object
};
