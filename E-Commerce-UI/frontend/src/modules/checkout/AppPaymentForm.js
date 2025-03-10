import React, { useState, useCallback } from 'react';
import {
  Grid,
  FormControlLabel,
  Radio,
  FormHelperText,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { PhonePeLogo } from 'modules/iconComponents/PhonePeLogo';
import { AmazonPayLogo } from 'modules/iconComponents/AmazonPayLogo';
import { PaytmLogo } from 'modules/iconComponents/PaytmLogo';
import { PhoneNumberField, FlexView } from 'modules/common/components';
import { AvailableAppDropdon } from './AvailableAppDropdon';

const appCodes = {
  paytm: 'paytm',
  phonepe: 'phonepe',
  amazonpay: 'amazon'
};

const useTextFieldStyles = makeStyles((theme) => ({
  root: {
    '& label': {
      ...theme.typography.body2,
      fontWeight: 600
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(2),
      height: theme.spacing(5),
      ...theme.typography.body2
    }
  }
}));

export const AppPaymentForm = ({
  setPaymentSourceData,
  paymentOption,
  setError,
  error
}) => {
  const textFieldClasses = useTextFieldStyles();
  const [values, setValues] = useState({
    channel: null,
    phoneNumber: { phoneNumber: '' },
    phone: ''
  });

  const onPhoneNumberChannge = useCallback(
    (value) => {
      setValues({
        ...values,
        phoneNumber: { ...values.phoneNumber, phoneNumber: value }
      });
      if (error) {
        setError({});
      }
    },
    [error, setError, values]
  );

  const onPhoneNumberBlur = useCallback(() => {
    setPaymentSourceData(paymentOption, {
      ...values,
      phone: values.phoneNumber.phoneNumber
    });
  }, [paymentOption, setPaymentSourceData, values]);

  const onAppChange = useCallback(
    (value) => (e) => {
      setValues({
        ...values,
        channel: value
      });
      setPaymentSourceData(paymentOption, {
        phone: values.phoneNumber.phoneNumber,
        channel: value
      });
      if (error) {
        setError({});
      }
    },
    [error, paymentOption, setError, setPaymentSourceData, values]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={appCodes.paytm}
            control={
              <Radio
                onChange={onAppChange(appCodes.paytm)}
                checked={values.channel === appCodes.paytm}
              />
            }
          />
          <PaytmLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={appCodes.phonepe}
            control={
              <Radio
                onChange={onAppChange(appCodes.phonepe)}
                checked={values.channel === appCodes.phonepe}
              />
            }
          />
          <PhonePeLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={appCodes.amazonpay}
            control={
              <Radio
                onChange={onAppChange(appCodes.amazonpay)}
                checked={values.channel === appCodes.amazonpay}
              />
            }
          />
          <AmazonPayLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <AvailableAppDropdon
          selectedAppId={values.channel}
          onAppChange={onAppChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <PhoneNumberField
          value={values.phoneNumber}
          classes={textFieldClasses}
          onChange={onPhoneNumberChannge}
          label="Phone Number"
          shrink
          onBlur={onPhoneNumberBlur}
        />
      </Grid>
      {error && error.error ? (
        <Grid item xs={12}>
          <FormHelperText error>
            {error.message || 'Please select an App'}
          </FormHelperText>
        </Grid>
      ) : null}
    </Grid>
  );
};

AppPaymentForm.propTypes = {
  setPaymentSourceData: PropTypes.func,
  paymentOption: PropTypes.string,
  setError: PropTypes.func,
  error: PropTypes.any
};
