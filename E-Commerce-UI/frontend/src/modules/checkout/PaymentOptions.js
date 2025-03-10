import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FlexView } from 'modules/common';
import { CardPaymentForm } from './CardPaymentForm';
import { NetBankingPaymentForm } from './NetBankingPaymentForm';
// import { AppPaymentForm } from './AppPaymentForm';
import { UPIForm } from './UPIForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  accordion: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  }
}));

export const PaymentOptions = ({
  preview,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  paymentOptions,
  setPaymentSourceData,
  setError,
  error,
  isUserActionRequired,
  userActionDetailMessage,
  setUserActionReqired
}) => {
  const classes = useStyles();

  const onPaymentMethodChange = useCallback(
    (value) => (e) => {
      setSelectedPaymentMethod(value);
      setError({});
    },
    [setError, setSelectedPaymentMethod]
  );

  return (
    <div className={classes.root}>
      <RadioGroup aria-label="Payment Options" name="Payment Options">
        <FlexView>
          <FormControlLabel
            value={paymentOptions.card}
            control={
              <Radio
                checked={selectedPaymentMethod === paymentOptions.card}
                onChange={onPaymentMethodChange(paymentOptions.card)}
                color="primary"
              />
            }
          />
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Credit / Debit Card
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CardPaymentForm
                errors={error}
                setError={setError}
                preview={preview}
                paymentOption={paymentOptions.card}
                setPaymentSourceData={setPaymentSourceData}
              />
            </AccordionDetails>
          </Accordion>
        </FlexView>
        <FlexView>
          <FormControlLabel
            value={paymentOptions.netBanking}
            control={
              <Radio
                checked={selectedPaymentMethod === paymentOptions.netBanking}
                onChange={onPaymentMethodChange(paymentOptions.netBanking)}
                color="secondary"
              />
            }
          />
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Net Banking</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <NetBankingPaymentForm
                errors={error}
                setError={setError}
                preview={preview}
                paymentOption={paymentOptions.netBanking}
                setPaymentSourceData={setPaymentSourceData}
              />
            </AccordionDetails>
          </Accordion>
        </FlexView>
        {/* <FlexView>
          <FormControlLabel
            value={paymentOptions.app}
            control={
              <Radio
                checked={selectedPaymentMethod === paymentOptions.app}
                onChange={onPaymentMethodChange(paymentOptions.app)}
                color="default"
              />
            }
          />
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Apps</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AppPaymentForm
                error={error[paymentOptions.app]}
                setError={setError}
                preview={preview}
                paymentOption={paymentOptions.app}
                setPaymentSourceData={setPaymentSourceData}
              />
            </AccordionDetails>
          </Accordion>
        </FlexView> */}
        <FlexView>
          <FormControlLabel
            value={paymentOptions.upi}
            control={
              <Radio
                checked={selectedPaymentMethod === paymentOptions.upi}
                onChange={onPaymentMethodChange(paymentOptions.upi)}
                color="primary"
              />
            }
          />
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>UPI</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UPIForm
                errors={error}
                setError={setError}
                preview={preview}
                paymentOption={paymentOptions.upi}
                setPaymentSourceData={setPaymentSourceData}
                isUserActionRequired={isUserActionRequired}
                userActionDetailMessage={userActionDetailMessage}
                setUserActionReqired={setUserActionReqired}
              />
            </AccordionDetails>
          </Accordion>
        </FlexView>
        <FlexView>
          <FormControlLabel
            value={paymentOptions.cod}
            control={
              <Radio
                checked={selectedPaymentMethod === paymentOptions.cod}
                onChange={onPaymentMethodChange(paymentOptions.cod)}
                color="default"
              />
            }
          />
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Cash on Delivery
              </Typography>
            </AccordionSummary>
          </Accordion>
        </FlexView>
      </RadioGroup>
    </div>
  );
};

PaymentOptions.propTypes = {
  preview: PropTypes.objectOf(PropTypes.any),
  selectedPaymentMethod: PropTypes.string,
  paymentOptions: PropTypes.object,
  setSelectedPaymentMethod: PropTypes.func,
  setPaymentSourceData: PropTypes.func,
  setError: PropTypes.func,
  error: PropTypes.object,
  isUserActionRequired: PropTypes.bool,
  userActionDetailMessage: PropTypes.string,
  setUserActionReqired: PropTypes.func
};

export default PaymentOptions;
