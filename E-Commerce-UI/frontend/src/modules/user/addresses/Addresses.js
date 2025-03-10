import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlexView } from 'modules/common/components';
import {
  makeStyles,
  FormControlLabel,
  Radio,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { AddressCardLoading } from './AddressCardLoading';
import { AddressCard } from './AddressCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  accordion: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  },
  flexViewContainer: {
    marginTop: theme.spacing(1)
  },
  noAddress: {
    fontStyle: 'italic',
    marginTop: theme.spacing(2)
  },
  radioButtonMargin: {
    marginLeft: theme.spacing(6)
  }
}));

const color = {
  0: 'primary',
  1: 'secondary',
  2: 'default'
};

export const Addresses = ({
  addresses,
  loading,
  userId,
  selectedAddressId,
  onAddressChange,
  showRadioButton = false
}) => {
  const classes = useStyles();
  const handleAddressChange = useCallback(
    (addressId) => () => {
      if (onAddressChange) onAddressChange(addressId);
    },
    [onAddressChange]
  );

  if (loading) return <AddressCardLoading />;

  if (!loading && addresses && addresses.length === 0)
    return (
      <FlexView>
        <Typography
          variant="body2"
          className={clsx(
            classes.noAddress,
            showRadioButton && classes.radioButtonMargin
          )}
        >
          No Address, Please add using add button
        </Typography>
      </FlexView>
    );

  return (
    <>
      {addresses.map((address, index) => (
        <FlexView key={address.id} className={classes.flexViewContainer}>
          {showRadioButton ? (
            <FormControlLabel
              value={address.id}
              control={
                <Radio
                  checked={selectedAddressId === address.id}
                  onChange={handleAddressChange(address.id)}
                  color={color[index]}
                />
              }
            />
          ) : null}
          <AddressCard
            onAddressChange={onAddressChange}
            selectedAddressId={selectedAddressId}
            userId={userId}
            key={address.id}
            address={address}
            editable
          />
        </FlexView>
      ))}
    </>
  );
};

Addresses.propTypes = {
  addresses: PropTypes.array,
  loading: PropTypes.bool,
  userId: PropTypes.string,
  selectedAddressId: PropTypes.string,
  onAddressChange: PropTypes.func,
  showRadioButton: PropTypes.bool
};
