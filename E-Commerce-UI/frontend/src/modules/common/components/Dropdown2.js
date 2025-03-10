import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export const Dropdown2 = ({
  id,
  label,
  onChange,
  selectedId,
  noneOption,
  disabled,
  variant = 'filled',
  options,
  loading,
  displayEmpty = false,
  ...textFieldProps
}) => {
  const SelectProps = useMemo(() => ({ displayEmpty }), [displayEmpty]);
  const InputLabelProps = useMemo(() => ({ shrink: true }), []);

  const handleChange = useCallback(
    (e) => {
      const option = options.find((o) => o.id === e.target.value);

      if (onChange) onChange(option || { id: '', name: '' });
    },
    [onChange, options]
  );

  if (loading) return <Skeleton height={40} animation="wave" />;

  return (
    <TextField
      id={id || 'dropdown'}
      select
      SelectProps={SelectProps}
      label={label}
      fullWidth
      value={selectedId}
      InputLabelProps={InputLabelProps}
      disabled={disabled}
      onChange={handleChange}
      variant={variant}
      {...textFieldProps}
    >
      {noneOption && (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      )}
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name || option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

Dropdown2.propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  selectedId: PropTypes.string,
  onChange: PropTypes.func,
  noneOption: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any),
  variant: PropTypes.string,
  loading: PropTypes.bool,
  displayEmpty: PropTypes.bool
};
