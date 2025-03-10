import React, { useState, useCallback } from 'react';
import {
  Grid,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { CanaraBankLogo } from 'modules/iconComponents/CanaraBankLogo';
import { StateBankOfIndiaLogo } from 'modules/iconComponents/StateBankOfIndiaLogo';
import { AxisBankLogo } from 'modules/iconComponents/AxisBankLogo';
import { ICICIBankLogo } from 'modules/iconComponents/ICICIBankLogo';
import { HDFCBankLogo } from 'modules/iconComponents/HDFCBankLogo';
import { IDFCFirstBankLogo } from 'modules/iconComponents/IDFCFirstBankLogo';
import { PunjabNationalBankLogo } from 'modules/iconComponents/PunjabNationalBankLogo';
import { UnionBankOfIndiaLogo } from 'modules/iconComponents/UnionBankOfIndiaLogo';
import { FlexView } from 'modules/common';
import { AvailableBankDropdown } from './AvailableBankDropdown';

const bankCode = {
  sbi: '3044',
  pnb: '3038',
  icici: '3022',
  axis: '3003',
  hdfc: '3021',
  idfc: '3024',
  canara: '3009',
  union: '3055'
};

export const NetBankingPaymentForm = ({
  setPaymentSourceData,
  paymentOption,
  setError,
  errors
}) => {
  const [selectedBankId, setSelectedBankId] = useState(null);
  const error = errors[paymentOption];

  const onBankChange = useCallback(
    (value) => (e) => {
      setSelectedBankId(value);
      setPaymentSourceData(paymentOption, {
        channel: 'link',
        netbanking_bank_code: value
      });
      if (errors) {
        setError({});
      }
    },
    [errors, paymentOption, setError, setPaymentSourceData]
  );

  const onBlur = useCallback(() => {
    setPaymentSourceData(paymentOption, {
      channel: 'link',
      netbanking_bank_code: selectedBankId
    });
  }, [paymentOption, selectedBankId, setPaymentSourceData]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={bankCode.sbi}
            control={
              <Radio
                onChange={onBankChange(bankCode.sbi)}
                onBlur={onBlur}
                checked={selectedBankId === bankCode.sbi}
              />
            }
          />
          <StateBankOfIndiaLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={bankCode.pnb}
            control={
              <Radio
                onChange={onBankChange(bankCode.pnb)}
                onBlur={onBlur}
                checked={selectedBankId === bankCode.pnb}
              />
            }
          />
          <PunjabNationalBankLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={bankCode.icici}
            control={
              <Radio
                onChange={onBankChange(bankCode.icici)}
                onBlur={onBlur}
                checked={selectedBankId === bankCode.icici}
              />
            }
          />
          <ICICIBankLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={bankCode.axis}
            control={
              <Radio
                onChange={onBankChange(bankCode.axis)}
                onBlur={onBlur}
                checked={selectedBankId === bankCode.axis}
              />
            }
          />
          <AxisBankLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={bankCode.hdfc}
            control={
              <Radio
                onChange={onBankChange(bankCode.hdfc)}
                onBlur={onBlur}
                checked={selectedBankId === bankCode.hdfc}
              />
            }
          />
          <HDFCBankLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={bankCode.idfc}
            control={
              <Radio
                onChange={onBankChange(bankCode.idfc)}
                onBlur={onBlur}
                checked={selectedBankId === bankCode.idfc}
              />
            }
          />
          <IDFCFirstBankLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={bankCode.canara}
            control={
              <Radio
                onChange={onBankChange(bankCode.canara)}
                onBlur={onBlur}
                checked={selectedBankId === bankCode.canara}
              />
            }
          />
          <CanaraBankLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <FlexView>
          <FormControlLabel
            value={bankCode.union}
            control={
              <Radio
                onChange={onBankChange(bankCode.union)}
                onBlur={onBlur}
                checked={selectedBankId === bankCode.union}
              />
            }
          />
          <UnionBankOfIndiaLogo width="80px" height="60px" />
        </FlexView>
      </Grid>
      <Grid item xs={12} sm={8}>
        <AvailableBankDropdown
          selectedBankId={selectedBankId}
          onBankChange={onBankChange}
          onBlur={onBlur}
        />
      </Grid>
      {error && error.error ? (
        <Grid item xs={12}>
          <FormHelperText error>
            {error.message || 'Please select a bank'}
          </FormHelperText>
        </Grid>
      ) : null}
    </Grid>
  );
};

NetBankingPaymentForm.propTypes = {
  setPaymentSourceData: PropTypes.func,
  paymentOption: PropTypes.string,
  setError: PropTypes.func,
  errors: PropTypes.any
};
