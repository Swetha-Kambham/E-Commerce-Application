import React, { useCallback, useEffect, useState } from 'react';
import {
  TextField,
  Grid,
  makeStyles,
  FormHelperText,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { cashfreeOrderStatus } from 'modules/common/enums';
import { useHistory } from 'react-router-dom';
import { FlexView } from 'modules/common/components/FlexView';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useGetPaymentStatus } from './hooks';

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

const useStyles = makeStyles((theme) => ({
  remainingTime: {
    whiteSpace: 'pre',
    textAlign: 'center'
  },
  container: {
    margin: 'auto'
  }
}));

const defaultDuration = 60 * 5;

const getFormattedDuration = (duration) =>
  `${Math.floor(duration / 60)} Min ${duration % 60} Sec\nRemaining`;

export const UPIForm = ({
  setPaymentSourceData,
  paymentOption,
  errors,
  setError,
  isUserActionRequired,
  userActionDetailMessage,
  setUserActionReqired,
  preview: { draftId }
}) => {
  const textFieldClasses = useTextFieldStyles();
  const error = errors[paymentOption];
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const { paymentStatus, refetch } = useGetPaymentStatus({
    draftId
  });

  const onBlur = useCallback(() => {
    setPaymentSourceData(paymentOption, {
      channel: 'collect',
      upi_id: value
    });
  }, [paymentOption, setPaymentSourceData, value]);

  const onVPAChange = useCallback(
    (event) => {
      setValue(event && event.target && event.target.value);
      if (errors) {
        setError({});
      }
      if (isTimeUp) {
        setIsTimeUp(false);
      }
    },
    [errors, isTimeUp, setError]
  );

  const onUpdate = useCallback(() => {
    refetch();
  }, [refetch]);

  const onTimeup = useCallback(() => {
    setInProgress(false);
    setIsTimeUp(true);
    setUserActionReqired(false, null);
    setTimeout(() => {
      setIsTimeUp(false);
    }, 10000);
  }, [setUserActionReqired]);

  useEffect(() => {
    if (isUserActionRequired && !inProgress) {
      setIsTimeUp(false);
      setInProgress(true);
    }
  }, [inProgress, isUserActionRequired]);

  useEffect(() => {
    if (paymentStatus.orderStatus === cashfreeOrderStatus.paid) {
      setInProgress(false);
      setUserActionReqired(false, null);
      history.push(`/order/confirmation?orderId=${paymentStatus.orderId}`);
    }
  }, [
    draftId,
    history,
    paymentStatus.orderId,
    paymentStatus.orderStatus,
    setUserActionReqired
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="vpa"
          label="VPA"
          fullWidth
          onChange={onVPAChange}
          onBlur={onBlur}
          value={value}
          classes={textFieldClasses}
          placeholder="testtpv@oksbi"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>
      {inProgress ? (
        <Grid item xs={12} sm={12} md={12}>
          <FlexView>
            <div className={classes.container}>
              <CountdownCircleTimer
                isPlaying
                duration={defaultDuration}
                colors={['#314CCC', '#09F260', '#09D4F2', '#D3F209', '#A30000']}
                colorsTime={[defaultDuration, 55, 20, 12, 0]}
                onComplete={onTimeup}
                onUpdate={onUpdate}
              >
                {({ remainingTime }) => (
                  <Typography className={classes.remainingTime}>
                    {getFormattedDuration(remainingTime)}
                  </Typography>
                )}
              </CountdownCircleTimer>
            </div>
          </FlexView>
          <FlexView>
            <div className={classes.container}>
              <Typography>
                Open app in which provided upi is configured and make payment.
              </Typography>
            </div>
          </FlexView>
        </Grid>
      ) : null}
      {isTimeUp &&
      (paymentStatus.orderStatus === cashfreeOrderStatus.active ||
        paymentStatus.orderStatus === cashfreeOrderStatus.expired) ? (
        <Grid item xs={12} sm={12} md={12}>
          <FlexView>
            <div className={classes.container}>
              <Typography variant="body2">
                We have not yet received payment. Please try again.
              </Typography>
            </div>
          </FlexView>
        </Grid>
      ) : null}
      {error && error.error ? (
        <Grid item xs={12}>
          <FormHelperText error>
            {error.message || 'Please enter a valid upi'}
          </FormHelperText>
        </Grid>
      ) : null}
    </Grid>
  );
};

UPIForm.propTypes = {
  setPaymentSourceData: PropTypes.func,
  paymentOption: PropTypes.string,
  setError: PropTypes.func,
  errors: PropTypes.object,
  isUserActionRequired: PropTypes.bool,
  userActionDetailMessage: PropTypes.string,
  setUserActionReqired: PropTypes.func,
  preview: PropTypes.object
};
