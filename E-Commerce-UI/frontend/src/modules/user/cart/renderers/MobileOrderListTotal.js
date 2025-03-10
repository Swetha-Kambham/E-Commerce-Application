import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { FlexView } from 'modules/common';

const field = 'total';

const useStyles = makeStyles((theme) => ({
  totalValue: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 600
  },
  totalLabel: {
    marginLeft: 'auto'
  }
}));

export const MobileOrderListTotal = ({ totals }) => {
  const classes = useStyles();
  const { amount, currency } = totals[field] || {};

  const priceString = `${currency?.symbol} ${parseFloat(amount).toFixed(2)}`;

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <FlexView>
            <Typography className={classes.totalLabel} variant="subtitle1">
              Cart Totals
            </Typography>
          </FlexView>
        </Grid>
        <Grid item xs={7}>
          <FlexView>
            <Typography className={classes.totalValue} variant="subtitle1">
              {priceString}
            </Typography>
          </FlexView>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
};

MobileOrderListTotal.propTypes = {
  totals: PropTypes.object
};
