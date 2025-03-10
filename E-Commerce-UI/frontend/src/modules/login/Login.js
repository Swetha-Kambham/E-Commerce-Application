import React, { useCallback, useMemo } from 'react';
import {
  Typography,
  Button,
  Checkbox,
  FormHelperText,
  Grid,
  Paper,
  CircularProgress,
  Fade
} from '@material-ui/core';
import {
  PhoneNumberField,
  FlexView,
  PasswordField,
  Roles,
  LinkButton
} from 'modules/common';
import { resource } from 'modules/resources';
import { useLocation, Redirect } from 'react-router-dom';
import useAuthContext from 'modules/auth';
import { CrafthillsLogo } from 'modules/common/components/CrafthillsLogo';
import { IconLinkButton } from 'modules/common/components/IconLinkButton';
import {
  useFormState,
  useFormOnChange,
  useLogin,
  useOnSubmit,
  getRole,
  signUpPath,
  useStyles
} from './hooks';

const { loginDialog: resourceLabels } = resource;

const useQuery = ({ search }) => {
  return new URLSearchParams(search);
};

export const Login = () => {
  const {
    isAuthenticated,
    role: authorizedRole,
    updateAuthContext
  } = useAuthContext();
  const classes = useStyles();
  const { search } = useLocation();
  const query = useQuery({ search });
  const { login } = useLogin();
  const role = useMemo(() => getRole(query), [query]);
  const {
    values,
    setValues,
    loginError,
    setLoginError,
    isAuthenticating,
    setIsAuthenticating
  } = useFormState();
  const { phoneNumber, password, rememberMe } = values;
  const {
    onPhoneNumberChange,
    onPasswordChange,
    onRememberMeChange,
    handleReset
  } = useFormOnChange({
    setLoginError,
    values,
    setValues
  });
  const { handleSignIn } = useOnSubmit({
    login,
    values,
    setLoginError,
    handleReset,
    updateAuthContext,
    setIsAuthenticating
  });

  const onKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleSignIn();
      }
    },
    [handleSignIn]
  );

  const ForgotPasswordLabel = useMemo(
    () => (
      <Typography className={classes.forgotPasswordLabel} variant="body2">
        {resourceLabels.forgotPassword}
      </Typography>
    ),
    [classes.forgotPasswordLabel]
  );

  const SignUpLabel = useMemo(
    () => (
      <Typography variant="body2" className={classes.signupLabel}>
        Sign up
      </Typography>
    ),
    [classes.signupLabel]
  );

  if (isAuthenticated && authorizedRole === Roles.seller)
    return <Redirect to="/seller" />;
  if (isAuthenticated && authorizedRole === Roles.admin)
    return <Redirect to="/admin" />;
  if (isAuthenticated && authorizedRole === Roles.user)
    return <Redirect to="/" />;

  return (
    <>
      <div className={classes.root}>
        <FlexView>
          <IconLinkButton
            className={classes.logo}
            to="/"
            icon={<CrafthillsLogo />}
          />
        </FlexView>
        <Paper square className={classes.paper}>
          <Grid item xs={12}>
            <Typography className={classes.header} variant="h5">
              Login
            </Typography>
          </Grid>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <PhoneNumberField
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={onPhoneNumberChange}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                placeholder={resourceLabels.password}
                onChange={onPasswordChange}
                onKeyPress={onKeyPress}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <FlexView>
                <Checkbox
                  className={classes.checkbox}
                  color="primary"
                  checked={rememberMe}
                  onChange={onRememberMeChange}
                />
                <Typography className={classes.rememberMe} variant="body2">
                  {resourceLabels.rememberMe}
                </Typography>
                <LinkButton
                  className={classes.forgotPasswordButton}
                  disableRipple
                  label={ForgotPasswordLabel}
                  to="/reset-password"
                />
              </FlexView>
            </Grid>
            {loginError ? (
              <Grid item xs={12}>
                <FormHelperText className={classes.error} error>
                  {loginError}
                </FormHelperText>
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <FlexView>
                <Button
                  className={classes.signInButton}
                  variant="contained"
                  onClick={handleSignIn}
                  onKeyPress={onKeyPress}
                >
                  {resourceLabels.signIn}
                </Button>
              </FlexView>
            </Grid>
            <Grid item xs={12}>
              {role !== Roles.admin ? (
                <FlexView className={classes.signupContainer}>
                  <Typography variant="body2">
                    {resourceLabels.didNotHaveAnAccount}
                  </Typography>
                  <LinkButton
                    className={classes.signup}
                    label={SignUpLabel}
                    to={signUpPath(role)}
                  />
                </FlexView>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
      </div>
      {isAuthenticating ? (
        <div className={classes.loadingContainer}>
          <Fade className={classes.loading} in={isAuthenticating} unmountOnExit>
            <CircularProgress />
          </Fade>
          <Typography className={classes.loadingLabel}>
            Please Wait...
          </Typography>
        </div>
      ) : null}
    </>
  );
};
