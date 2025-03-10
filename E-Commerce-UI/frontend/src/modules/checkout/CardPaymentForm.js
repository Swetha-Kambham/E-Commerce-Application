import React from 'react';
import {
  Paper,
  TextField,
  Grid,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { VisaPaymentMethod } from 'modules/iconComponents/VisaPaymentMethod';
import { MasterCardPaymentMethod } from 'modules/iconComponents/MasterCardPaymentMethod';
import { MaestroCardPaymentMethod } from 'modules/iconComponents/MaestroCardPaymentMethod';
import { AmericanExpressPaymentMethod } from 'modules/iconComponents/AmericanExpressPaymentMethod';
import { RupayCardPaymentMethod } from 'modules/iconComponents/RupayCardPaymentMethod';
import { MonthPicker } from 'modules/common/components/MonthPicker';
import {
  cardTypes,
  getCardType,
  useCardPaymentFormInitialValues,
  useCardPaymentFormFormOnChange
} from './hooks';
import { CardNumber } from './CardNumber';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', width: '100%' },
  paper: {
    margin: 'auto',
    padding: theme.spacing(2),
    width: theme.spacing(50),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  container: {
    width: '70%',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  paymentButtonContainer: {
    margin: 'auto !important'
  }
}));

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

const endIcons = {
  [cardTypes.VISA]: <VisaPaymentMethod width="40px" height="30px" />,
  [cardTypes.MASTERCARD]: (
    <MasterCardPaymentMethod width="40px" height="30px" />
  ),
  [cardTypes.AMEX]: <AmericanExpressPaymentMethod width="40px" height="30px" />,
  [cardTypes.MAESTRO]: <MaestroCardPaymentMethod width="40px" height="30px" />,
  [cardTypes.RUPAY]: <RupayCardPaymentMethod width="40px" height="30px" />
};

export const CardPaymentForm = ({
  setPaymentSourceData,
  paymentOption,
  setError,
  errors
}) => {
  const classes = useStyles();
  const error = errors[paymentOption];
  const textFieldClasses = useTextFieldStyles();
  const { values, setValues } = useCardPaymentFormInitialValues();
  const {
    onNameChange,
    onCardNumberChange,
    onCvvChange,
    onValidThruChange,
    changePaymentSourceData
  } = useCardPaymentFormFormOnChange({
    values,
    setValues,
    setPaymentSourceData,
    paymentOption,
    errors,
    setError
  });

  const { holder, cvv, validThru, cardNumber } = values || {};
  const cardType = getCardType(cardNumber);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name-on-card"
                label="Name on Card"
                fullWidth
                onChange={onNameChange}
                onBlur={changePaymentSourceData}
                value={holder}
                classes={textFieldClasses}
                placeholder="John Smith"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CardNumber
                id="card-number"
                label="Card Number"
                fullWidth
                value={cardNumber}
                onBlur={changePaymentSourceData}
                onChange={onCardNumberChange}
                classes={textFieldClasses}
                endIcon={endIcons[cardType]}
                placeholder="1234 2345 3456 7890"
                variant="outlined"
                shrink
              />
            </Grid>
            <Grid item xs={8}>
              <MonthPicker
                label="Valid Thru"
                inputVariant="outlined"
                format="MM / yyyy"
                placeholder="12 / 2027"
                onBlur={changePaymentSourceData}
                disablePast
                date={validThru}
                onChange={onValidThruChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="cvv"
                label="CVV"
                fullWidth
                value={cvv}
                onBlur={changePaymentSourceData}
                onChange={onCvvChange}
                classes={textFieldClasses}
                InputProps={{
                  inputProps: {
                    type: 'password',
                    maxLength: 3
                  }
                }}
                placeholder="123"
                variant="outlined"
                className={classes.cvv}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            {error?.error ? (
              <Grid item xs={12}>
                <FormHelperText error>
                  {error.message || 'Invalid Card Data'}
                </FormHelperText>
              </Grid>
            ) : null}
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

CardPaymentForm.propTypes = {
  setPaymentSourceData: PropTypes.func,
  paymentOption: PropTypes.string,
  setError: PropTypes.func,
  errors: PropTypes.object
};
