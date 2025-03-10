import React, { useCallback, useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { useHistory } from 'react-router-dom';
import { PaymentOptions } from './PaymentOptions';
import { AmountInfo } from './AmountInfo';
import {
  useMarkOrderAsPending,
  useMakePayment,
  paymentOptions,
  usePaymentSourceDataHook
} from './hooks';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex'
  },
  arrowBackIcon: {
    marginBottom: 'auto',
    marginTop: 'auto'
  },
  paymentButtonContainer: {
    width: '100%',
    marginTop: theme.spacing(4),
    display: 'flex'
  },
  paymentButton: {
    margin: 'auto'
  }
}));

const arrowBackOutlinedIcon = <ArrowBackOutlinedIcon />;

export const PaymentTab = ({ preview, handleChange, tabs }) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const {
    values,
    setPaymentSourceData,
    setError,
    error,
    setUserActionReqired
  } = usePaymentSourceDataHook();
  const { markOrderAsPending } = useMarkOrderAsPending();
  const { handlePayment } = useMakePayment({
    preview,
    paymentOption: selectedPaymentMethod,
    paymentSourceData: values[selectedPaymentMethod],
    markOrderAsPending,
    history,
    setError,
    setUserActionReqired
  });

  const onBackClick = useCallback(
    (e) => {
      handleChange(e, tabs.preview.value);
    },
    [handleChange, tabs.preview.value]
  );

  return (
    <>
      <div className={classes.buttonContainer}>
        <Button startIcon={arrowBackOutlinedIcon} onClick={onBackClick}>
          Back
        </Button>
      </div>
      <AmountInfo preview={preview} />
      <PaymentOptions
        preview={preview}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        paymentOptions={paymentOptions}
        setPaymentSourceData={setPaymentSourceData}
        setError={setError}
        error={error}
        isUserActionRequired={values.isUserActionRequired}
        userActionDetailMessage={values.userActionDetailMessage}
        setUserActionReqired={setUserActionReqired}
      />
      <div className={classes.paymentButtonContainer}>
        <Button
          className={classes.paymentButton}
          variant="contained"
          color="primary"
          disabled={!selectedPaymentMethod}
          onClick={handlePayment}
        >
          {selectedPaymentMethod === paymentOptions.cod
            ? 'Place Order'
            : 'Proceed to Pay'}
        </Button>
      </div>
    </>
  );
};

PaymentTab.propTypes = {
  handleChange: PropTypes.func,
  tabs: PropTypes.objectOf(PropTypes.any),
  preview: PropTypes.objectOf(PropTypes.any)
};
