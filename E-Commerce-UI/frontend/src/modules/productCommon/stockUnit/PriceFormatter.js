import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export const PriceFormatter = ({ record, field }) => {
  const { currency } = record;

  const amount = parseFloat(record[field]);

  const amountVal = isNaN(amount) ? null : amount.toFixed(2);

  return (
    <>
      {amountVal && currency ? (
        <Typography>{`${currency.symbol} ${amountVal}`}</Typography>
      ) : (
        <span>&ndash;</span>
      )}
    </>
  );
};

PriceFormatter.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string
};
