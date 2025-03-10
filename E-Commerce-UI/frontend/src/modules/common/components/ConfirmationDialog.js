import React from 'react';
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

const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    padding: 'unset',
    float: 'right',
    marginTop: theme.spacing(-0.5)
  }
}));

export const ConfirmationDialog = ({
  open,
  onClose,
  onConfirmClick,
  title,
  message
}) => (
  <Dialog open={open} disableBackdropClick onClose={onClose}>
    <DialogTitle>
      {title}
      <IconButton classes={useCloseButtonStyles()} onClick={onClose}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button color="default" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onConfirmClick} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirmClick: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string
};
