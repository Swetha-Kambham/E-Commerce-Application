import React, { useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { cashfreeOrderStatus } from 'modules/common/enums/cashfreeConstants';
import { useHistory } from 'react-router-dom';
import { useArchiveOrder } from './useArchiveOrder';

const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    padding: 'unset',
    float: 'right',
    marginTop: theme.spacing(-0.5)
  }
}));

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none'
  }
}));

const titleResourceKeys = {
  [cashfreeOrderStatus.active]: 'Payment not found',
  [cashfreeOrderStatus.expired]: 'please re order'
};

const messageResourceKeys = {
  [cashfreeOrderStatus.active]:
    'We did not receive any payment for this order.\nIf you wish to confirm your order, please click Proceed to pay.',
  [cashfreeOrderStatus.expired]: 'please re order'
};

export const PendingOrderActionDialog = ({ open, onClose, orderInfo }) => {
  const history = useHistory();
  const { archiveOrder } = useArchiveOrder();

  const classes = useStyles();

  const onArchiveOrderClick = useCallback(async () => {
    await archiveOrder({ orderId: orderInfo.orderId });
    onClose();
  }, [archiveOrder, onClose, orderInfo.orderId]);

  const onProceedToPayClick = useCallback(async () => {
    history.push(`/checkout/${orderInfo.orderId}?tab=payment`);
  }, [history, orderInfo.orderId]);

  return (
    <Dialog open={open} disableBackdropClick onClose={onClose}>
      <DialogTitle>
        {titleResourceKeys[orderInfo.paymentStatus]}
        <IconButton classes={useCloseButtonStyles()} onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {messageResourceKeys[orderInfo.paymentStatus]}
      </DialogContent>
      <DialogActions>
        <Button color="default" className={classes.button} onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="secondary"
          className={classes.button}
          onClick={onArchiveOrderClick}
        >
          Archive order
        </Button>
        {orderInfo.paymentStatus === cashfreeOrderStatus.active ? (
          <Button
            onClick={onProceedToPayClick}
            className={classes.button}
            color="primary"
          >
            Proceed to pay
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

PendingOrderActionDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  orderInfo: PropTypes.object
};
