import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { SearchableDropdown } from 'modules/common/components';
import { useAvailableApps } from './hooks';

export const AvailableAppDropdon = ({ selectedAppId, onAppChange }) => {
  const { apps, loading } = useAvailableApps();

  const onChange = useCallback(
    (value) => {
      onAppChange(value.id)({});
    },
    [onAppChange]
  );

  return (
    <SearchableDropdown
      id="app-dropdown"
      options={apps}
      loading={loading}
      onChange={onChange}
      selectedId={selectedAppId}
      variant="outlined"
      size="medium"
      label="Select an App"
    />
  );
};

AvailableAppDropdon.propTypes = {
  selectedAppId: PropTypes.string,
  onAppChange: PropTypes.func
};
