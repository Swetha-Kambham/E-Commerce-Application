import {
  Paper,
  Grid,
  Typography,
  Button,
  FormHelperText,
  Divider,
  CircularProgress,
  Fade
} from '@material-ui/core';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  TextInputField,
  PhoneNumberField,
  FlexView,
  LinkButton
} from 'modules/common/components';
import { useDialogState } from 'modules/common/hooks';
import { get } from 'lodash';
import { OTPDialog } from 'modules/registration/OTPDialog';
import useAuthContext from 'modules/auth';
import { ChangePassword } from 'modules/changePasswordCommon';
import {
  useStyles,
  useFormState,
  useFormOnChange,
  useRequestVerificationCode,
  signInPath,
  signUpPath,
  useVerifyVerificationCode,
  useResetPasswordHooks
} from './hooks';

const hasError = (errors, key) => Object.hasOwnProperty.call(errors, key);
const getError = (errors, key) => get(errors, key);

export const ResetPasswordContent = ({ role }) => {
  const {
    isAuthenticated,
    role: authorizedRole,
    updateAuthContext
  } = useAuthContext();
  const classes = useStyles();
  const formik = useFormState();
  const {
    values,
    errors,
    setFieldValue,
    setErrors,
    validateForm,
    setFieldError,
    isSubmitting,
    setSubmitting
  } = formik;
  const { verifyVerificationCode } = useVerifyVerificationCode();
  const {
    phoneNumber,
    emailAddress,
    serviceSId,
    accountExists: isAccountExists
  } = values;
  const { onPhoneNumberChange, onEmailAddressChange } = useFormOnChange({
    setFieldValue,
    setErrors,
    errors
  });

  const {
    isDialogOpen: isOTPDialogOpen,
    openDialog: OpenOTPDialog,
    closeDialog: closeOTPDialog
  } = useDialogState(isAccountExists);

  const { requestVerificationCode } = useRequestVerificationCode({
    setFieldError
  });

  const {
    onVerifyClick,
    onGetVerificationCodeClick,
    getVerificationCode,
    passwordChangeCallback
  } = useResetPasswordHooks({
    verifyVerificationCode,
    role,
    phoneNumber,
    emailAddress,
    serviceSId,
    updateAuthContext,
    closeOTPDialog,
    setFieldValue,
    validateForm,
    OpenOTPDialog,
    requestVerificationCode,
    setSubmitting
  });

  const dividerClasses = useMemo(
    () => ({ root: classes.divider }),
    [classes.divider]
  );

  return (
    <>
      <Paper square className={classes.paper}>
        {isAuthenticated && authorizedRole === role ? (
          <ChangePassword
            role={role}
            successCallback={passwordChangeCallback}
          />
        ) : (
          <>
            <Grid item xs={12}>
              <Typography className={classes.header} variant="h5">
                Reset Password
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PhoneNumberField
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={onPhoneNumberChange}
                  error={hasError(errors, 'phoneNumber')}
                  helperText={getError(errors, 'phoneNumber')}
                />
              </Grid>
              <Grid item xs={12}>
                <FlexView>
                  <Typography className={classes.or} variant="caption">
                    Or
                  </Typography>
                </FlexView>
              </Grid>
              <Grid item xs={12}>
                <TextInputField
                  placeholder="Email Address"
                  maxlength={64}
                  value={emailAddress}
                  onChange={onEmailAddressChange}
                  error={hasError(errors, 'emailAddress')}
                  helperText={getError(errors, 'emailAddress')}
                />
              </Grid>
              <Grid item xs={12}>
                <FlexView>
                  <Button
                    onClick={onGetVerificationCodeClick}
                    className={classes.getVerificationCodeButton}
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Get Verification Code
                  </Button>
                </FlexView>
              </Grid>
              {hasError(errors, 'accountExists') ? (
                <Grid item xs={12}>
                  <FlexView>
                    <FormHelperText
                      error
                      className={classes.accountExistsError}
                    >
                      {getError(errors, 'accountExists')}
                    </FormHelperText>
                  </FlexView>
                </Grid>
              ) : null}
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <FlexView className={classes.buttonContainer}>
            <LinkButton
              variant="text"
              className={classes.login}
              label="Log In"
              to={signInPath(role)}
            />
            <Divider classes={dividerClasses} orientation="vertical" />
            <LinkButton
              variant="text"
              className={classes.login}
              label="Sign up"
              to={signUpPath(role)}
            />
          </FlexView>
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
      <OTPDialog
        phoneNumber={phoneNumber}
        open={isOTPDialogOpen}
        timer={30}
        onClose={closeOTPDialog}
        onVerifyClick={onVerifyClick}
        onResendClick={getVerificationCode}
      />
    </>
  );
};

ResetPasswordContent.propTypes = {
  role: PropTypes.string
};
