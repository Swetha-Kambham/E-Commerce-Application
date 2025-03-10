import React, { useCallback, useMemo } from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const re = /^[0-9]*$/;

export const Quantity = ({
  quantity,
  label,
  onChange,
  labelClasses,
  ...textFieldProps
}) => {
  const handleChange = useCallback(
    (e) => {
      if (
        e.target.value === undefined ||
        e.target.value === null ||
        e.target.value === ''
      ) {
        onChange('');
        e.preventDefault();
        return;
      }
      if (e.target.value && re.test(e.target.value)) {
        e.preventDefault();
        onChange(e.target.value);
      }
    },
    [onChange]
  );

  const onFocus = useCallback((event) => {
    event && event.target && event.target.select && event.target.select();
    event && event.preventDefault();
  }, []);

  const InputLabelProps = useMemo(
    () => ({ shrink: true, classes: labelClasses }),
    [labelClasses]
  );

  return (
    <TextField
      label={label}
      value={quantity}
      id="quantity"
      onFocus={onFocus}
      fullWidth
      InputLabelProps={InputLabelProps}
      onChange={handleChange}
      variant="outlined"
      {...textFieldProps}
    />
  );
};

Quantity.propTypes = {
  quantity: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func,
  labelClasses: PropTypes.objectOf(PropTypes.any)
};
