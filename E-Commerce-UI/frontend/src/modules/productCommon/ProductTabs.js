import React, { useCallback } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';

export const ProductTabs = ({ tabs, setTabValue, value }) => {
  const handleChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue]
  );

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="off"
      aria-label="seller-header"
    >
      <Tab tabIndex={0} label={tabs.product.label} value={tabs.product.value} />
      <Tab tabIndex={0} label={tabs.stocks.label} value={tabs.stocks.value} />
    </Tabs>
  );
};

ProductTabs.propTypes = {
  setTabValue: PropTypes.func,
  tabs: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.string
};
