import React, { useCallback } from 'react';
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

export const EditDialog = ({
  open,
  closeEditDialog,
  dialogContentClasses: overrideDialogContentClasses,
  EditContent,
  title,
  onSaveClick,
  fullScreen,
  validateForm,
  resetForm,
  classes: overrideClasses,
  errors,
  isSubmitting,
  ...rest
}) => {
  const dialogClasses = useDialogStyles({ classes: overrideClasses });
  const dialogContentClasses = useDialogContentStyles({
    classes: overrideDialogContentClasses
  });
  const handleSaveClick = useCallback(async () => {
    if (validateForm) {
      const err = await validateForm();

      if (!Object.keys(err) || Object.keys(err).length === 0) {
        onSaveClick();
      }
    } else {
      onSaveClick();
    }
  }, [validateForm, onSaveClick]);

  const handleCancelClick = useCallback(async () => {
    if (resetForm) {
      await resetForm();
    }
    if (closeEditDialog) {
      closeEditDialog();
    }
  }, [closeEditDialog, resetForm]);

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
        <IconButton
          classes={useCloseButtonStyles()}
          onClick={handleCancelClick}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent classes={dialogContentClasses}>
        <EditContent errors={errors} {...rest} />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isSubmitting}
          color="default"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
          disabled={(errors && Object.keys(errors).length > 0) || isSubmitting}
          onClick={handleSaveClick}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool,
  closeEditDialog: PropTypes.func,
  fullScreen: PropTypes.bool,
  onSaveClick: PropTypes.func,
  errors: PropTypes.object,
  EditContent: PropTypes.elementType,
  title: PropTypes.string,
  validateForm: PropTypes.func,
  resetForm: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.any),
  dialogContentClasses: PropTypes.objectOf(PropTypes.any),
  isSubmitting: PropTypes.bool
};
