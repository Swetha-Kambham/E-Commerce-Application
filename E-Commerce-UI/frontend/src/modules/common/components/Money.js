import React, { useCallback, useMemo } from 'react';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useAdornmentStyles = makeStyles((theme) => ({
  root: {},
  positionStart: {}
}));

const re = /^\d*\.?\d*$/;

export const Money = ({
  amount,
  adornmentClasses: adornmentClassesOverride,
  currencySymbol,
  label,
  onChange,
  readOnly,
  ...textFieldProps
}) => {
  const adornmentClasses = useAdornmentStyles({
    classes: adornmentClassesOverride
  });
  const handleChange = useCallback(
    (e) => {
      if (e.target.value && re.test(e.target.value)) {
        onChange(e.target.value);
      }
      if (!e.target.value) {
        onChange(0);
      }
    },
    [onChange]
  );

  const value = useMemo(() => parseFloat(amount).toFixed(2), [amount]);

  const onFocus = useCallback((event) => {
    event && event.target && event.target.select && event.target.select();
  }, []);

  const InputProps = useMemo(
    () => ({
      startAdornment: (
        <InputAdornment classes={adornmentClasses} position="start">
          {currencySymbol}
        </InputAdornment>
      ),
      type: 'number',
      inputProps: {
        onFocus
      },
      readOnly
    }),
    [adornmentClasses, currencySymbol, onFocus, readOnly]
  );

  return (
    <TextField
      label={label}
      value={value}
      id="money"
      fullWidth
      InputLabelProps={{
        shrink: true
      }}
      InputProps={InputProps}
      onChange={handleChange}
      variant="outlined"
      {...textFieldProps}
    />
  );
};

Money.propTypes = {
  amount: PropTypes.number,
  currencySymbol: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  adornmentClasses: PropTypes.objectOf(PropTypes.any),
  readOnly: PropTypes.bool
};
