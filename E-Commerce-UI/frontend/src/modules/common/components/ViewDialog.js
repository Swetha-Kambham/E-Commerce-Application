import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useDialogStyles = makeStyles((theme) => ({
  paper: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

const useDialogContentStyles = makeStyles((theme) => ({
  root: {}
}));

const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    padding: 'unset',
    float: 'right',
    marginTop: theme.spacing(-0.5)
  }
}));

export const ViewDialog = ({
  open,
  closeEditDialog,
  dialogContentClasses: overrideDialogContentClasses,
  ViewContent,
  title,
  fullScreen,
  classes: overrideClasses,
  ...rest
}) => {
  const dialogClasses = useDialogStyles({ classes: overrideClasses });
  const dialogContentClasses = useDialogContentStyles({
    classes: overrideDialogContentClasses
  });

  return (
    <Dialog
      open={open}
      disableBackdropClick
      fullScreen={fullScreen}
      fullWidth={fullScreen}
      onClose={closeEditDialog}
      classes={dialogClasses}
    >
      <DialogTitle>
        {title}
        <IconButton classes={useCloseButtonStyles()} onClick={closeEditDialog}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent classes={dialogContentClasses}>
        <ViewContent {...rest} />
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={closeEditDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ViewDialog.propTypes = {
  open: PropTypes.bool,
  closeEditDialog: PropTypes.func,
  fullScreen: PropTypes.bool,
  ViewContent: PropTypes.elementType,
  title: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.any),
  dialogContentClasses: PropTypes.objectOf(PropTypes.any)
};
