import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { PasswordField } from 'modules/common';
import PropTypes from 'prop-types';
import { resource } from 'modules/resources';

const useSubmitButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    margin: 'auto',
    width: theme.spacing(20),
    borderRadius: theme.spacing(1),
    borderColor: '#010101',
    backgroundColor: '#000000',
    opacity: '80%',
    '&:hover': {
      backgroundColor: '#000000',
      opacity: '100%',
      color: '#0A0808'
    }
  },
  label: {
    color: '#ffffff',
    fontSize: '0.875rem',
    textTransform: 'none'
  }
}));

const useStyles = makeStyles((theme) => ({
  spacing: { marginTop: theme.spacing(2) },
  extraSpacing: { marginBottom: theme.spacing(4), marginTop: theme.spacing(4) }
}));

const { createNewPasswordDialog: resourceLabels } = resource;

export const CreateNewPasswordDialogContent = ({
  onPasswordChange,
  onConfirmPasswordChange,
  values
}) => {
  const classes = useStyles();
  const { password, confirmPassword } = values;

  return (
    <>
      <div className={classes.spacing}>
        <PasswordField
          label={resourceLabels.enterNewPassword}
          onChange={onPasswordChange}
          value={password}
        />
      </div>
      <div className={classes.spacing}>
        <PasswordField
          label={resourceLabels.confirmNewPassword}
          onChange={onConfirmPasswordChange}
          value={confirmPassword}
        />
      </div>
      <div className={classes.extraSpacing}>
        <Button
          classes={useSubmitButtonStyles()}
          disabled={!password || !confirmPassword}
          variant="contained"
        >
          {resourceLabels.submit}
        </Button>
      </div>
    </>
  );
};

CreateNewPasswordDialogContent.propTypes = {
  onPasswordChange: PropTypes.func,
  onConfirmPasswordChange: PropTypes.func,
  values: PropTypes.objectOf(PropTypes.any)
};
