import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { SearchableDropdown } from 'modules/common/components';
import { useAvailableBank } from './hooks';

export const AvailableBankDropdown = ({
  selectedBankId,
  onBankChange,
  onBlur
}) => {
  const { banks, loading } = useAvailableBank();

  const onChange = useCallback(
    (value) => {
      onBankChange(value.id)({});
    },
    [onBankChange]
  );

  return (
    <SearchableDropdown
      id="bank-dropdown"
      options={banks}
      onChange={onChange}
      onBlur={onBlur}
      selectedId={selectedBankId}
      loading={loading}
      variant="outlined"
      fullWidth
      size="medium"
      label="Choose your bank"
    />
  );
};

AvailableBankDropdown.propTypes = {
  selectedBankId: PropTypes.string,
  onBankChange: PropTypes.func,
  onBlur: PropTypes.func
};
