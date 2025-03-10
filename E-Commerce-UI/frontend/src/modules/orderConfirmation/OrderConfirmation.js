/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';
import { FlexView, LinkButton } from 'modules/common/components';
import clsx from 'clsx';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useStyles } from './useStyles';

import { useOrderConfirmationHook } from './useOrderConfirmationHook';

const useQuery = ({ search }) => {
  return new URLSearchParams(search);
};

export const OrderConfirmation = () => {
  const [inProgress, setInProgress] = useState(true);
  const [isSuccess, setIsSuccess] = useState(null);
  const classes = useStyles();
  const { search } = useLocation();
  const query = useQuery({ search });
  const isPayOnDeliveryOrder = query.get('payOnDelivery') || false;
  const orderId = query.get('orderId');

  const { handleConfirmOrder } = useOrderConfirmationHook({
    isPayOnDeliveryOrder,
    orderId,
    setInProgress,
    setIsSuccess
  });

  useEffect(() => {
    handleConfirmOrder();
  }, []);

  return (
    <div className={classes.root}>
      <FlexView>
        <div
          className={clsx(
            classes.paper,
            isSuccess === true && classes.success,
            isSuccess === false && classes.error
          )}
        >
          <div className={classes.container}>
            {inProgress ? (
              <>
                <CircularProgress size={36} />
                <Typography>
                  We are processing your order, please wait...
                </Typography>
              </>
            ) : null}
            {!inProgress && isSuccess ? (
              <>
                <CheckCircleOutlineIcon className={classes.icon} />
                <Typography className={classes.messageLabel} variant="h6">
                  Order succesfully placed!
                </Typography>
                <LinkButton
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  label="Continue Shopping"
                  to="/"
                />
              </>
            ) : null}
            {!inProgress && !isSuccess ? (
              <>
                <CancelOutlinedIcon className={classes.crossIcon} />
                <Typography className={classes.messageLabel} variant="h6">
                  Sorry! Error ocurred while processing your order, Please
                  contact us if you need any help
                </Typography>
                <LinkButton
                  className={classes.button}
                  variant="contained"
                  color="default"
                  label="Continue Shopping"
                  to="/"
                />
              </>
            ) : null}
          </div>
        </div>
      </FlexView>
    </div>
  );
};
