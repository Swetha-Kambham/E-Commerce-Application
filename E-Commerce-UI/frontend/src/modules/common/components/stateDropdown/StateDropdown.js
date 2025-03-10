import PropTypes from 'prop-types';
import React from 'react';
import { Dropdown2 } from 'modules/common/components/Dropdown2';

import { useStates } from 'modules/common/hooks';

export const StateDropdown = ({
  label,
  onChange,
  selectedId,
  noneOption,
  disabled,
  displayEmpty,
  variant = 'filled',
  ...textFieldProps
}) => {
  const { states, loading } = useStates();

  return (
    <Dropdown2
      id="category-dropdown"
      select
      label={label}
      fullWidth
      value={selectedId || ''}
      loading={loading}
      options={states}
      noneOption={noneOption}
      disabled={disabled}
      onChange={onChange}
      displayEmpty={displayEmpty}
      variant={variant}
      {...textFieldProps}
    />
  );
};

StateDropdown.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  selectedId: PropTypes.string,
  onChange: PropTypes.func,
  noneOption: PropTypes.bool,
  disabled: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  variant: PropTypes.string
};
