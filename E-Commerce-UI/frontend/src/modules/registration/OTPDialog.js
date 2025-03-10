import React from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { FlexView } from 'modules/common';
import { OTPDialogContent } from './OTPDialogContent';

const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    padding: 'unset',
    marginLeft: 'auto'
  }
}));

export const OTPDialog = ({ open, onClose, ...rest }) => (
  <Dialog open={open} maxWidth="xs" disableBackdropClick onClose={onClose}>
    <DialogTitle>
      <FlexView>
        <Typography variant="h6">Phone Number Verification</Typography>
        <IconButton classes={useCloseButtonStyles()} onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </FlexView>
    </DialogTitle>
    <DialogContent>
      <OTPDialogContent onClose={onClose} {...rest} />
    </DialogContent>
  </Dialog>
);

OTPDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirmClick: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string
};
