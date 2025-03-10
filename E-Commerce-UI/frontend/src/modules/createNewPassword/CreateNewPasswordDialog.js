import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { resource } from 'modules/resources';
import { CreateNewPasswordDialogContent } from './CreateNewPasswordDialogContent';

const useDialogStyles = makeStyles((theme) => ({
  paper: {
    width: theme.spacing(50),
    overflowY: 'unset',
    backgroundColor: '#ADC8C4',
    backgroundImage: 'linear-gradient(to top, white, transparent)'
  }
}));

const { createNewPasswordDialog: resourceLabels } = resource;

const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    padding: 'unset',
    float: 'right',
    marginTop: theme.spacing(-0.5)
  }
}));

export const CreateNewPasswordDialog = ({
  open,
  closeNewPasswordDialog,
  ...rest
}) => (
  <Dialog
    open={open}
    onClose={closeNewPasswordDialog}
    classes={useDialogStyles()}
  >
    <DialogTitle>
      {resourceLabels.createNewPassword}
      <IconButton
        classes={useCloseButtonStyles()}
        onClick={closeNewPasswordDialog}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <CreateNewPasswordDialogContent {...rest} />
    </DialogContent>
  </Dialog>
);

CreateNewPasswordDialog.propTypes = {
  open: PropTypes.bool,
  closeNewPasswordDialog: PropTypes.func
};
