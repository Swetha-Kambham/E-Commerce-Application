import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  CardMedia,
  makeStyles,
  Button,
  Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FlexView } from 'modules/common/components';
import { useIsMobile, useDialogState } from 'modules/common/hooks';
import { PAYMENT_STATUS } from 'modules/checkout/hooks/useGetPaymentStatus';
import { useApolloClient } from '@apollo/client';
import { cashfreeOrderStatus } from 'modules/common/enums/cashfreeConstants';
import { useHistory } from 'react-router-dom';
import { PendingOrderActionDialog } from './PendingOrderActionDialog';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  flexView: {
    marginTop: theme.spacing(2)
  },
  image: {
    maxWidth: theme.spacing(20),
    height: theme.spacing(15)
  },
  heading: {
    color: theme.palette.error.main
  },
  processWithYourOrder: {
    textTransform: 'none',
    float: 'right',
    '& span': {
      whiteSpace: 'nowrap'
    }
  },
  information: {
    color: theme.palette.info.main,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(1)
    }
  },
  action: {
    marginLeft: 'auto'
  }
}));

const Information = ({
  firstProductName,
  totalProducts,
  variant = 'body2',
  classes
}) => {
  const message = useMemo(
    () =>
      totalProducts === 1
        ? `Order for ${firstProductName} is not confirmed. Need custom action.`
        : `Order for ${firstProductName} and ${
            totalProducts - 1
          } more item is not confirmed. Need custom action.`,
    [firstProductName, totalProducts]
  );

  return (
    <Typography variant={variant} className={classes.information}>
      {message}
    </Typography>
  );
};

Information.propTypes = {
  firstProductName: PropTypes.string,
  totalProducts: PropTypes.number,
  variant: PropTypes.oneOf(['body2', 'caption']),
  classes: PropTypes.object
};

export const PendingOrders = ({ pendingOrderItems }) => {
  const client = useApolloClient();
  const history = useHistory();
  const { openDialog, closeDialog, isDialogOpen } = useDialogState();
  const classes = useStyles();
  const { isMobile } = useIsMobile();
  const [selectedOrderInfo, setSelectedOrderInfo] = useState({
    orderId: null,
    paymentStatus: null
  });

  const onProceedOrderClick = useCallback(
    (orderId) => async (event) => {
      event && event.stopPropagation();
      const { data } = await client.query({
        query: PAYMENT_STATUS,
        variables: { orderId },
        fetchPolicy: 'network-only'
      });

      if (
        data &&
        data.paymentStatus &&
        data.paymentStatus.orderStatus === cashfreeOrderStatus.paid
      ) {
        history.push(
          `/order/confirmation?orderId=${orderId}&orderToken=${data.paymentStatus.cashFreeOrderId}`
        );
      } else {
        setSelectedOrderInfo({
          orderId,
          paymentStatus:
            data && data.paymentStatus && data.paymentStatus.orderStatus
        });
        openDialog();
      }
    },
    [client, history, openDialog]
  );

  const onClose = useCallback(() => {
    setSelectedOrderInfo({ orderId: null, paymentStatus: null });
    closeDialog();
  }, [closeDialog]);

  return (
    <>
      {Object.keys(pendingOrderItems || {}).map((key) => {
        return (
          <Accordion key={key} className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={0}>
                <Grid item xs={6} md={2}>
                  <Typography variant="h6" className={classes.heading}>
                    Pending
                  </Typography>
                </Grid>
                {!isMobile ? (
                  <Grid item xs={6} md={6}>
                    <Information
                      firstProductName={pendingOrderItems[key][0].productName}
                      totalProducts={pendingOrderItems[key].length}
                      classes={classes}
                    />
                  </Grid>
                ) : null}
                <Grid item xs={6} md={4}>
                  <Button
                    className={classes.processWithYourOrder}
                    color="primary"
                    onClick={onProceedOrderClick(key)}
                  >
                    Proceed with your order
                  </Button>
                </Grid>
                {isMobile ? (
                  <Grid item xs={12}>
                    <Information
                      firstProductName={pendingOrderItems[key][0].productName}
                      totalProducts={pendingOrderItems[key].length}
                      variant="caption"
                      classes={classes}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {(pendingOrderItems[key] || []).map((orderItem) => (
                <Paper key={orderItem.id} className={classes.paper}>
                  <Typography variant="body1">
                    {orderItem.orderItemStatus}
                  </Typography>
                  <FlexView className={classes.flexView}>
                    <CardMedia
                      className={classes.image}
                      id={orderItem.id}
                      component="img"
                      alt="View Not Available"
                      image={
                        orderItem.images &&
                        orderItem.images[0] &&
                        orderItem.images[0].url
                      }
                    />
                    <div className={classes.action}>
                      <Button
                        className={classes.button}
                        variant="text"
                        color="secondary"
                      >
                        View Details
                      </Button>
                    </div>
                  </FlexView>
                </Paper>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
      {isDialogOpen ? (
        <PendingOrderActionDialog
          open={isDialogOpen}
          onClose={onClose}
          orderInfo={selectedOrderInfo}
        />
      ) : null}
    </>
  );
};

PendingOrders.propTypes = {
  pendingOrderItems: PropTypes.object
};
