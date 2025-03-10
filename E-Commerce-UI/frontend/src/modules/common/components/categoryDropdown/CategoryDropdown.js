import PropTypes from 'prop-types';
import React from 'react';
import { useCategories } from 'modules/common/hooks';
import { Dropdown2 } from 'modules/common/components/Dropdown2';

export const CategoryDropdown = ({
  label,
  onChange,
  selectedId,
  noneOption,
  disabled,
  variant = 'filled',
  displayEmpty,
  ...textFieldProps
}) => {
  const { categories, loading } = useCategories();

  return (
    <Dropdown2
      id="category-dropdown"
      select
      label={label}
      fullWidth
      value={selectedId}
      loading={loading}
      options={categories}
      noneOption={noneOption}
      disabled={disabled}
      onChange={onChange}
      displayEmpty={displayEmpty}
      variant={variant}
      {...textFieldProps}
    />
  );
};

CategoryDropdown.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  selectedId: PropTypes.string,
  onChange: PropTypes.func,
  noneOption: PropTypes.bool,
  disabled: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  variant: PropTypes.string
};
