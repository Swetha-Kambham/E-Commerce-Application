import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: { margin: theme.spacing(1, 0, 1, 0) },
  cell: {
    padding: theme.spacing(2),
    fontSize: '0.875rem',
    textAlign: 'left',
    fontWeight: 400,
    lineHeight: 1.43,
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    letterSpacing: '0.01071em',
    verticalAlign: 'inherit'
  },
  bold: {
    fontWeight: 600
  }
}));

export const Preview = ({ preview }) => {
  const classes = useStyles();
  const orderTotal = parseFloat(preview.orderTotal).toFixed(2);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <div className={classes.cell}>
            <Typography>Item</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.cell}>
            <Typography>Qty</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.cell}>
            <Typography>Total Price</Typography>
          </div>
        </Grid>
        {(preview.orderItems || []).map((orderItem) => {
          const totalPrice = parseFloat(orderItem.totalPrice).toFixed(2);
          return (
            <React.Fragment key={orderItem.id}>
              <Grid item xs={4}>
                <div className={classes.cell}>
                  <Typography variant="body1" className={classes.bold}>
                    {orderItem.productName}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.cell}>
                  <Typography variant="body1">{orderItem.quantity}</Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.cell}>
                  {orderItem.totalPrice && orderItem.currency ? (
                    <Typography variant="body1">
                      <Typography>{`${orderItem.currency.symbol} ${totalPrice}`}</Typography>
                    </Typography>
                  ) : null}
                </div>
              </Grid>
            </React.Fragment>
          );
        })}
        <Grid item xs={4} />
        <Grid item xs={4}>
          <div className={classes.cell}>
            <Typography>Sub Total</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.cell}>
            {preview.orderTotal && preview.currency ? (
              <Typography variant="body1">
                {`${preview.currency?.symbol} ${orderTotal}`}
              </Typography>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <div className={classes.cell}>
            <Typography>Total</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.cell}>
            {preview.orderTotal && preview.currency ? (
              <Typography variant="body1">
                {`${preview.currency.symbol} ${orderTotal}`}
              </Typography>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

Preview.propTypes = {
  preview: PropTypes.object
};
