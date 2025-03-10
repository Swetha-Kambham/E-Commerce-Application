import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import months from './months.json';
import { Dropdown2 } from '../Dropdown2';

export const Monthdropdown = ({ fullWidth = false }) => {
  const [selectedMonth, setSelectedMonth] = React.useState({});

  const handleChange = useCallback((value) => {
    setSelectedMonth(value);
  }, []);

  return (
    <Dropdown2
      id="month-dropdown"
      variant="outlined"
      margin="dense"
      displayEmpty
      fullWidth={false}
      label="Month"
      options={months}
      selectedId={selectedMonth.id}
      onChange={handleChange}
    />
  );
};

Monthdropdown.propTypes = {
  fullWidth: PropTypes.bool
};
