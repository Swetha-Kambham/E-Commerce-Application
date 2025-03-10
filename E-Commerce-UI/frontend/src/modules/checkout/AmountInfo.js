import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { height: theme.spacing(12), display: 'flex' },
  amountContainer: { marginLeft: 'auto', marginRight: 'auto', display: 'flex' },
  label: {
    paddingRight: theme.spacing(1)
  },
  amount: {
    paddingLeft: theme.spacing(1),
    fontWeight: 600
  }
}));

export const AmountInfo = ({ preview }) => {
  const classes = useStyles();
  const orderTotal = useMemo(
    () => parseFloat(preview?.orderTotal).toFixed(2),
    [preview]
  );

  return (
    <div className={classes.root}>
      <div className={classes.amountContainer}>
        <Typography className={classes.label}>Order Total</Typography>
        <Typography
          className={classes.amount}
        >{`${preview.currency?.symbol} ${orderTotal}`}</Typography>
      </div>
    </div>
  );
};

AmountInfo.propTypes = {
  preview: PropTypes.objectOf(PropTypes.any)
};

export default AmountInfo;
