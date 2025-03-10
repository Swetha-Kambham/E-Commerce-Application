import React, { useState, useCallback, useMemo } from 'react';
import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { PreviewTab } from './PreviewTab';
import { PaymentTab } from './PaymentTab';
import { AddressTab } from './AddressTab';
import { CheckoutTabContentSkeleton } from './CheckoutTabContentSkeleton';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: 'unset'
    }
  }
}));

const tabs = {
  address: {
    renderer: AddressTab,
    value: 'address',
    label: 'Choose Address'
  },
  preview: {
    renderer: PreviewTab,
    value: 'preview',
    label: 'Preview'
  },
  payment: {
    renderer: PaymentTab,
    value: 'payment',
    label: 'Payment'
  }
};

export const CheckoutTabs = ({ preview, loading, tab }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(
    tabs[tab]?.value || tabs.address.value
  );

  const handleChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue]
  );

  const Component = useMemo(() => tabs[tabValue].renderer, [tabValue]);

  return (
    <Paper className={classes.paper}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          value={tabs.address.value}
          label={tabs.address.label}
          disabled={tabValue !== tabs.address.value}
        />
        <Tab
          value={tabs.preview.value}
          label={tabs.preview.label}
          disabled={tabValue !== tabs.preview.value}
        />
        <Tab
          disabled={tabValue !== tabs.payment.value}
          value={tabs.payment.value}
          label={tabs.payment.label}
        />
      </Tabs>
      {loading ? (
        <CheckoutTabContentSkeleton />
      ) : (
        <Component preview={preview} handleChange={handleChange} tabs={tabs} />
      )}
    </Paper>
  );
};

CheckoutTabs.propTypes = {
  preview: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  tab: PropTypes.string
};
