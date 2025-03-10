import React, { useCallback, useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { TextInputField, PhoneNumberFormatter, FlexView } from 'modules/common';
import { resource } from 'modules/resources';
import clsx from 'clsx';
import { useOTPDialogContentStyles as useStyles } from './hooks';

const { otpDialog: resourceLabels } = resource;

export const OTPDialogContent = ({
  phoneNumber,
  timer,
  onVerifyClick,
  onClose,
  onResendClick
}) => {
  const classes = useStyles();
  const [countdown, setCountdown] = useState(timer);
  const [otp, setOtp] = useState('');
  const [invalidOTP, setInvalidOTP] = useState(null);

  const handleOTPChange = useCallback((e) => {
    setInvalidOTP(null);
    setOtp(e.target.value);
  }, []);

  useEffect(() => {
    if (countdown === 0) return;
    setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
  }, [countdown]);

  const handleResendClick = useCallback(() => {
    onResendClick();
    setCountdown(timer);
  }, [setCountdown, timer, onResendClick]);

  const failureCallback = useCallback(() => {
    setInvalidOTP('Verification code did not matched');
  }, []);

  const handleVerifyClick = useCallback(async () => {
    if (!otp) {
      setInvalidOTP('Please enter verification code');
      return;
    }
    onVerifyClick(otp, failureCallback);
  }, [failureCallback, onVerifyClick, otp]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FlexView>
          <Typography variant="caption">Enter the code sent to</Typography>
          <PhoneNumberFormatter
            value={phoneNumber}
            className={classes.phoneNumber}
          />
        </FlexView>
      </Grid>
      <Grid item xs={12}>
        <TextInputField
          label={resourceLabels.enterOTP}
          value={otp}
          onChange={handleOTPChange}
          classes={{ inputRoot: classes.verificationCodeInputRoot }}
          error={invalidOTP}
          helperText={invalidOTP}
        />
      </Grid>
      <Grid item xs={12}>
        <FlexView>
          <Typography className={classes.resendCodeMessage} variant="caption">
            Didn&apos;t receive the code?
          </Typography>
          <Button
            disabled={countdown > 0}
            variant="text"
            className={classes.resend}
            color="primary"
            onClick={handleResendClick}
          >
            Resend
          </Button>
          {countdown ? (
            <Typography
              className={clsx(
                classes.resendCodeMessage,
                countdown % 3 === 0 && classes.purple,
                countdown % 3 === 1 && countdown <= 20 && classes.blue,
                countdown % 3 === 2 && classes.green
              )}
              variant="caption"
            >
              {`in ${countdown} sec`}
            </Typography>
          ) : null}
        </FlexView>
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.verify}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleVerifyClick}
        >
          Verify
        </Button>
      </Grid>
      <Grid item xs={12}>
        <FlexView className={classes.changeContainer}>
          <Typography className={classes.changeMessage} variant="caption">
            Not your Phone Number?
          </Typography>
          <Button
            className={classes.change}
            variant="text"
            color="secondary"
            onClick={onClose}
          >
            Change
          </Button>
        </FlexView>
      </Grid>
    </Grid>
  );
};

OTPDialogContent.propTypes = {
  phoneNumber: PropTypes.object,
  onClose: PropTypes.func,
  timer: PropTypes.number,
  onVerifyClick: PropTypes.func,
  onResendClick: PropTypes.func
};
