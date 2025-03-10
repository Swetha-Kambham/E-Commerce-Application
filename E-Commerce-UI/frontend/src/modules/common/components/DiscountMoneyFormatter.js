import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [theme.breakpoints.up(800)]: {
      flexDirection: 'unset',
      flexWrap: 'nowrap'
    }
  },
  sellingPrice: { fontWeight: '600', fontSize: '1rem' },
  origialPrice: {
    textDecoration: 'line-through',
    textDecorationColor: '#6d6767',
    [theme.breakpoints.up(800)]: {
      padding: theme.spacing(0.5, 1, 1, 1)
    }
  },
  offLabel: {
    fontWeight: '600',
    [theme.breakpoints.up(800)]: {
      padding: theme.spacing(0.5, 1, 1, 0)
    }
  }
}));

export const DiscountMoneyFormatter = ({
  classes: overrideClasses,
  sellingPrice = {
    amount: 760,
    currency: { symbol: 'RS' }
  },
  originalPrice = {
    amount: 1270,
    currency: { symbol: 'RS' }
  }
}) => {
  const classes = useStyles({ classes: overrideClasses });
  const percentageDiscount = useMemo(
    () =>
      (
        (100 * (originalPrice.amount - sellingPrice.amount)) /
        originalPrice.amount
      ).toFixed(2),
    [originalPrice.amount, sellingPrice.amount]
  );
  const sellingPriceLabel = `${sellingPrice.currency.symbol} ${sellingPrice.amount}`;
  const originalPriceLabel = `${originalPrice.currency.symbol} ${originalPrice.amount}`;

  return (
    <span className={classes.root}>
      <Typography className={classes.sellingPrice} variant="subtitle2">
        {sellingPriceLabel}
      </Typography>
      <Typography className={classes.origialPrice} variant="caption">
        {originalPriceLabel}
      </Typography>
      <Typography className={classes.offLabel} variant="caption">
        {`(${percentageDiscount}% off)`}
      </Typography>
    </span>
  );
};

DiscountMoneyFormatter.propTypes = {
  sellingPrice: PropTypes.objectOf(PropTypes.any),
  originalPrice: PropTypes.objectOf(PropTypes.any),
  classes: PropTypes.objectOf(PropTypes.any)
};
