import {
  Paper,
  Grid,
  Typography,
  Snackbar,
  Fade,
  CircularProgress
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  PasswordField,
  TextInputField,
  PhoneNumberField,
  LoadingButton,
  FlexView,
  LinkButton
} from 'modules/common/components';
import { resource } from 'modules/resources';
import { useDialogState } from 'modules/common/hooks';
import { Roles } from 'modules/common/enums';
import MuiAlert from '@material-ui/lab/Alert';
import { get } from 'lodash';
import {
  useFormState,
  useFormOnChange,
  usePutUser,
  usePutSeller,
  useRegistrationContentStyles as useStyles,
  useRegistrationHook
} from './hooks';
import { OTPDialog } from './OTPDialog';

const { registrationDialogContent: resourceLabels } = resource;

const hasError = (errors, key) => Object.hasOwnProperty.call(errors, key);
const getError = (errors, key) => get(errors, key);

export const RegistrationContent = ({ role }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const classes = useStyles();
  const { putUser } = usePutUser();
  const { putSeller } = usePutSeller();
  const {
    openDialog: OpenOTPDialog,
    closeDialog: closeOTPDialog,
    isDialogOpen: isOTPDialogOpen
  } = useDialogState(false);
  const {
    values,
    setFieldValue,
    setFieldError,
    errors,
    handleSubmit,
    validateForm,
    isSubmitting,
    setSubmitting,
    setErrors
  } = useFormState({
    putUser,
    putSeller,
    role,
    setShowSuccessAlert
  });
  const {
    name,
    storeName,
    emailAddress,
    phoneNumber,
    password,
    confirmPassword
  } = values;

  const { onCreateAcoountClick, handleInitPhoneVerification, onVerifyClick } =
    useRegistrationHook({
      validateForm,
      values,
      setSubmitting,
      OpenOTPDialog,
      setFieldError,
      role,
      handleSubmit
    });

  const {
    onNameChange,
    onStoreNameChange,
    onEmailAddressChange,
    onPhoneNumberChange,
    onPasswordChange,
    onConfirmPasswordChange,
    closeSuccessAlert
  } = useFormOnChange({ setFieldValue, setShowSuccessAlert, setErrors });

  return (
    <>
      <Paper square className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.header} variant="h5">
              Sign up
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextInputField
              maxlength={50}
              placeholder={resourceLabels.name}
              value={name}
              onChange={onNameChange}
              error={hasError(errors, 'name')}
              helperText={getError(errors, 'name')}
            />
          </Grid>
          {role === Roles.seller ? (
            <Grid item xs={12}>
              <TextInputField
                maxlength={255}
                placeholder={resourceLabels.storeName}
                value={storeName}
                onChange={onStoreNameChange}
                error={hasError(errors, 'storeName')}
                helperText={getError(errors, 'storeName')}
              />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <PhoneNumberField
              placeholder={resourceLabels.phoneNumber}
              value={phoneNumber}
              onChange={onPhoneNumberChange}
              error={hasError(errors, 'phoneNumber')}
              helperText={getError(errors, 'phoneNumber')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputField
              placeholder={resourceLabels.emailAddress}
              maxlength={64}
              value={emailAddress}
              onChange={onEmailAddressChange}
              error={hasError(errors, 'emailAddress')}
              helperText={getError(errors, 'emailAddress')}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              placeholder={resourceLabels.password}
              value={password}
              onChange={onPasswordChange}
              error={hasError(errors, 'password')}
              helperText={getError(errors, 'password')}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              placeholder={resourceLabels.confirmPassword}
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              error={hasError(errors, 'confirmPassword')}
              helperText={getError(errors, 'confirmPassword')}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              variant="contained"
              className={classes.createAccountButton}
              fullWidth
              onClick={onCreateAcoountClick}
              label={resourceLabels.createAccount}
              submitLabel="Please wait..."
            />
          </Grid>
          <Grid item xs={12}>
            <FlexView>
              <Typography className={classes.signInMessage} variant="body2">
                Already have an account?
              </Typography>
              <LinkButton
                className={classes.loginButton}
                variant="text"
                label="Login here"
                to="/login"
              />
            </FlexView>
          </Grid>
        </Grid>
      </Paper>
      {isSubmitting ? (
        <div className={classes.loadingContainer}>
          <Fade className={classes.loading} in={isSubmitting} unmountOnExit>
            <CircularProgress />
          </Fade>
          <Typography className={classes.loadingLabel}>
            Please Wait...
          </Typography>
        </div>
      ) : null}
      {isOTPDialogOpen && (
        <OTPDialog
          phoneNumber={values.phoneNumber}
          open={isOTPDialogOpen}
          timer={30}
          onClose={closeOTPDialog}
          onVerifyClick={onVerifyClick}
          onResendClick={handleInitPhoneVerification}
        />
      )}
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
          Account succesfully created!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

RegistrationContent.propTypes = {
  role: PropTypes.string
};
