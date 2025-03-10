import React, { useCallback, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  Typography,
  TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { LoadingButton } from 'modules/common';

const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    padding: 'unset',
    float: 'right',
    marginTop: theme.spacing(-0.5)
  }
}));

const useStyles = makeStyles((theme) => ({
  reason: {
    marginTop: theme.spacing(2)
  }
}));

export const OrderCancelConfirmationDialog = ({
  open,
  onClose,
  onConfirmClick,
  orderId,
  orderItemId,
  inProgress
}) => {
  const [reason, setReason] = useState('');
  const classes = useStyles();

  const onChange = useCallback((event) => {
    setReason(event.target.value);
  }, []);

  const onCancelClick = useCallback(() => {
    onConfirmClick(orderId, orderItemId, reason);
  }, [onConfirmClick, orderId, orderItemId, reason]);

  return (
    <Dialog open={open} disableBackdropClick onClose={onClose}>
      <DialogTitle>
        Cancel Order
        <IconButton classes={useCloseButtonStyles()} onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>Are you sure you wanna cancel this order?</Typography>
        <TextField
          className={classes.reason}
          id="order-cancel-reason"
          value={reason}
          required
          onChange={onChange}
          variant="outlined"
          label="Please specify reason"
          multiline
          rows={6}
          fullWidth
        />
        <Typography variant="caption">
          Note: It may take 3-5 business days for your refund to be processed if
          you have made a payment for this order.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={onClose}>
          Close
        </Button>
        <LoadingButton
          disabled={!reason}
          onClick={onCancelClick}
          color="secondary"
          label="Cancel Order"
          isSubmitting={inProgress}
          circularProgressSize={16}
          submitLabel="Please wait..."
        />
      </DialogActions>
    </Dialog>
  );
};

OrderCancelConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirmClick: PropTypes.func,
  orderItemId: PropTypes.string,
  orderId: PropTypes.string,
  inProgress: PropTypes.bool
};
