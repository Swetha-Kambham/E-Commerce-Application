import React, { useMemo } from 'react';
import { useAuthContext } from 'modules/auth/AuthContext';
import { useDialogState } from 'modules/common/hooks/useDialogState';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FlexView } from 'modules/common';
import { AddressCard } from './AddressCard';
import { AddAddressCard } from './AddAddressCard';
import { Addresses } from './Addresses';
import { useAddresses } from '../hooks';

const useStyles = makeStyles((theme) => ({
  paper: ({ showRadioButton }) => ({
    marginLeft: showRadioButton && theme.spacing(6)
  }),
  radioButtonMargin: ({ showRadioButton }) => ({
    width: showRadioButton && theme.spacing(6),
    marginTop: showRadioButton && theme.spacing(1)
  })
}));

export const Address = ({
  selectedAddressId,
  onAddressChange,
  showRadioButton
}) => {
  const classes = useStyles({ showRadioButton });
  const { me } = useAuthContext();
  const { addresses, loading } = useAddresses({ userId: me.id });
  const {
    isDialogOpen: isAddDialogOpen,
    openDialog,
    closeDialog
  } = useDialogState(false);

  const addAddressCardClasses = useMemo(
    () => ({ paper: classes.paper }),
    [classes.paper]
  );

  return (
    <>
      <AddAddressCard
        classes={addAddressCardClasses}
        handleAddClick={openDialog}
        showRadioButton={showRadioButton}
      />
      {isAddDialogOpen ? (
        <FlexView>
          <div className={classes.radioButtonMargin} />
          <AddressCard
            addModeDialogCloseCallback={closeDialog}
            showRadioButton={showRadioButton}
            userId={me.id}
            key="add-new-address"
            editable
            isAddMode
          />
        </FlexView>
      ) : null}
      <Addresses
        onAddressChange={onAddressChange}
        showRadioButton={showRadioButton}
        selectedAddressId={selectedAddressId}
        addresses={addresses}
        loading={loading}
        userId={me.id}
      />
    </>
  );
};

Address.propTypes = {
  selectedAddressId: PropTypes.string,
  onAddressChange: PropTypes.func,
  showRadioButton: PropTypes.bool
};
