import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Address } from 'modules/user/addresses';
import { FlexView, LoadingButton } from 'modules/common/components';
import { makeStyles } from '@material-ui/core';
import { usePutOrderAddress } from './hooks';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 'auto'
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    bottom: 0
  }
}));

export const AddressTab = ({ handleChange, tabs, preview }) => {
  const classes = useStyles();
  const [isAddressUpdating, setIsAddressUpdating] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(
    preview?.billingAddress?.id
  );

  useEffect(() => {
    setSelectedAddressId(preview?.billingAddress?.id);
  }, [preview]);

  const onAddressChange = useCallback((addressId) => {
    setSelectedAddressId(addressId);
  }, []);
  const { putOrderAddress } = usePutOrderAddress();
  const onContinueClick = useCallback(
    async (e) => {
      setIsAddressUpdating(true);
      const res = await putOrderAddress({
        draftId: preview.draftId,
        addressId: selectedAddressId
      });
      if (res) {
        setIsAddressUpdating(false);
        handleChange(e, tabs.preview.value);
      }
    },
    [
      handleChange,
      preview,
      putOrderAddress,
      selectedAddressId,
      tabs.preview.value
    ]
  );

  return (
    <>
      <Address
        selectedAddressId={selectedAddressId}
        onAddressChange={onAddressChange}
        showRadioButton
      />
      <FlexView className={classes.buttonContainer}>
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={!selectedAddressId}
          isSubmitting={isAddressUpdating}
          onClick={onContinueClick}
          className={classes.button}
          label="Continue"
          submitLabel="Please Wait..."
          circularProgressSize={16}
        />
      </FlexView>
    </>
  );
};

AddressTab.propTypes = {
  handleChange: PropTypes.func,
  tabs: PropTypes.objectOf(PropTypes.any),
  preview: PropTypes.object
};
