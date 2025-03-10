import React, { useState } from 'react';
import { Grid, Snackbar, makeStyles } from '@material-ui/core';
import {
  PasswordField,
  LoadingButton,
  FlexView
} from 'modules/common/components';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import MuiAlert from '@material-ui/lab/Alert';
import { useFormState } from './useFormState';
import { useOnChange } from './useOnChange';
import { useUpdateUserPassword } from './useUpdateUserPassword';
import { useUpdateSellerPassword } from './useUpdateSellerPassword';

const useStyles = makeStyles((theme) => ({
  root: { margin: 'auto' },
  submitButton: {
    margin: 'auto',
    borderRadius: theme.spacing(2)
  },
  inputRoot: { overflow: 'visible' }
}));

const hasError = (errors, key) => Object.hasOwnProperty.call(errors, key);
const getError = (errors, key) => get(errors, key);

export const ChangePassword = ({ role, successCallback }) => {
  const classes = useStyles();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { updateUserPassword } = useUpdateUserPassword();
  const { updateSellerPassword } = useUpdateSellerPassword();
  const {
    values,
    errors,
    setFieldValue,
    setErrors,
    handleSubmit,
    isSubmitting
  } = useFormState({
    role,
    updateUserPassword,
    updateSellerPassword,
    setShowSuccessAlert,
    successCallback
  });
  const { password, confirmPassword } = values;
  const { onPasswordChange, onConfirmPasswordChange, closeSuccessAlert } =
    useOnChange({
      setFieldValue,
      setErrors,
      setShowSuccessAlert
    });

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PasswordField
            placeholder="New Password"
            value={password}
            onChange={onPasswordChange}
            error={hasError(errors, 'password')}
            helperText={getError(errors, 'password')}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            error={hasError(errors, 'confirmPassword')}
            helperText={getError(errors, 'confirmPassword')}
          />
        </Grid>
        <Grid item xs={12}>
          <FlexView>
            <LoadingButton
              className={classes.submitButton}
              label="Submit"
              submitLabel="Please wait..."
              onClick={handleSubmit}
              isSubmitting={isSubmitting}
              circularProgressSize={16}
              color="primary"
              variant="contained"
            />
          </FlexView>
        </Grid>
      </Grid>
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={6000}
        onClose={closeSuccessAlert}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={closeSuccessAlert}
          severity="success"
        >
          Password succesfully changed
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

ChangePassword.propTypes = {
  role: PropTypes.string,
  successCallback: PropTypes.func
};
