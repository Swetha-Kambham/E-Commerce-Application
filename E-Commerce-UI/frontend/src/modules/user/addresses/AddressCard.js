import React, { useCallback, useMemo } from 'react';
import {
  Paper,
  Grid,
  TextField,
  makeStyles,
  Typography,
  IconButton
} from '@material-ui/core';
import {
  useDialogState,
  EditDialog,
  StateDropdown,
  PhoneNumberField,
  DeleteConfirmationDialog,
  FlexView
} from 'modules/common';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useIsMobile } from 'modules/common/hooks/useScreenSize';
import {
  useAddressFormState,
  useAddressOnChange,
  usePutAddress,
  useDeleteAddress
} from '../hooks';
import { getFormattedAddress } from './utils';

const hasError = (errors, key) => Object.keys(errors)[0] === key;
const getError = (errors, key) =>
  Object.keys(errors)[0] === key ? errors[key] : null;

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: 'none'
    }
  },
  header: {
    marginBottom: 'auto',
    marginTop: 'auto'
  },
  editButton: {
    marginLeft: 'auto'
  }
}));

export const AddressCard = ({
  address,
  userId,
  editable,
  isAddMode,
  addModeDialogCloseCallback,
  onAddressChange,
  selectedAddressId
}) => {
  const { isMobile } = useIsMobile();
  const classes = useStyles();
  const { putAddress } = usePutAddress();
  const { deleteAddress } = useDeleteAddress();
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(isAddMode);

  const {
    isDialogOpen: isDeleteConfirmationDialogOpen,
    openDialog: openDeleteConfirmationDialog,
    closeDialog: closeDeleteConfirmationDialog
  } = useDialogState(false);

  const handleCloseEditDialog = useCallback(() => {
    closeEditDialog();
    addModeDialogCloseCallback && addModeDialogCloseCallback();
  }, [closeEditDialog, addModeDialogCloseCallback]);

  const { line1, line2, line3, line4 } = useMemo(
    () => getFormattedAddress(address),
    [address]
  );

  const {
    values,
    setFieldValue,
    validateForm,
    errors,
    resetForm,
    handleSubmit,
    isSubmitting
  } = useAddressFormState({
    putAddress,
    address,
    userId,
    isAddMode,
    handleCloseEditDialog
  });
  const formOnChange = useAddressOnChange({ setFieldValue });

  const handleDeleteAddress = useCallback(async () => {
    if (onAddressChange && selectedAddressId === address.id)
      onAddressChange(null);
    const res = await deleteAddress({ userId, addressId: address.id });
    if (res) closeDeleteConfirmationDialog();
  }, [
    address,
    closeDeleteConfirmationDialog,
    deleteAddress,
    onAddressChange,
    selectedAddressId,
    userId
  ]);

  return (
    <>
      <Paper className={classes.paper}>
        <Grid spacing={0} container>
          <Grid item xs={12}>
            <FlexView>
              <Typography className={classes.header} variant="h6">
                {line1}
              </Typography>
              {editable ? (
                <IconButton
                  onClick={openEditDialog}
                  color="primary"
                  variant="contained"
                  className={classes.editButton}
                >
                  <EditIcon />
                </IconButton>
              ) : null}
              {editable ? (
                <IconButton
                  onClick={openDeleteConfirmationDialog}
                  variant="contained"
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </FlexView>
          </Grid>
          <Grid item xs={12}>
            <FlexView>
              <Typography variant="subtitle1">{line2}</Typography>
            </FlexView>
          </Grid>
          <Grid item xs={12}>
            <FlexView>
              <Typography variant="subtitle1">{line3}</Typography>
            </FlexView>
          </Grid>
          <Grid item xs={12}>
            <FlexView>
              <Typography variant="subtitle1">{line4}</Typography>
            </FlexView>
          </Grid>
        </Grid>
      </Paper>
      {isDialogOpen && editable ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={handleCloseEditDialog}
          EditContent={AddressCardEdit}
          fullScreen={isMobile}
          values={values}
          formOnChange={formOnChange}
          title={isAddMode ? 'Add Address' : 'Edit Address'}
          onSaveClick={handleSubmit}
          errors={errors}
          validateForm={validateForm}
          resetForm={resetForm}
          isSubmitting={isSubmitting}
        />
      ) : null}
      {isDeleteConfirmationDialogOpen ? (
        <DeleteConfirmationDialog
          open={isDeleteConfirmationDialogOpen}
          onClose={closeDeleteConfirmationDialog}
          message="Are you sure you want to delete this address"
          title="Delete Address"
          onConfirmClick={handleDeleteAddress}
        />
      ) : null}
    </>
  );
};

AddressCard.propTypes = {
  address: PropTypes.objectOf(PropTypes.any),
  editable: PropTypes.bool,
  isAddMode: PropTypes.bool,
  addModeDialogCloseCallback: PropTypes.func,
  userId: PropTypes.string,
  onAddressChange: PropTypes.func,
  selectedAddressId: PropTypes.string
};

export const AddressCardEdit = ({ values, formOnChange, errors }) => {
  const {
    name,
    phoneNumber,
    pinCode,
    addressLine1,
    addressLine2,
    addressLine3,
    landmark,
    city,
    state
  } = values;
  const {
    onNameChange,
    onPinCodeChange,
    onAddressLine1Change,
    onAddressLine2Change,
    onAddressLine3Change,
    onLandmarkChange,
    onCityChange,
    onStateChange,
    onPhoneNumberChange
  } = formOnChange;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="seller.profile.name"
          label="Name"
          value={name}
          error={hasError(errors, 'name')}
          helperText={getError(errors, 'name')}
          required
          onChange={onNameChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <PhoneNumberField
          id="seller.profile.phoneNumber"
          label="Phone Number"
          required
          error={hasError(errors, 'phoneNumber')}
          helperText={getError(errors, 'phoneNumber')}
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          fullWidth
          margin="dense"
          shrink
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="seller.profile.pinCode"
          label="Pin Code"
          value={pinCode}
          error={hasError(errors, 'pinCode')}
          helperText={getError(errors, 'pinCode')}
          required
          onChange={onPinCodeChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <StateDropdown
          label="State"
          onChange={onStateChange}
          required
          selectedId={state && state.id}
          error={hasError(errors, 'state')}
          helperText={getError(errors, 'state')}
          variant="outlined"
          noneOption={false}
          margin="dense"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="seller.profile.addresssLine1"
          label="Address Line 1"
          value={addressLine1}
          error={hasError(errors, 'addressLine1')}
          helperText={getError(errors, 'addressLine1')}
          required
          onChange={onAddressLine1Change}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="seller.profile.addresssLine2"
          label="Address Line 2"
          value={addressLine2}
          onChange={onAddressLine2Change}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="seller.profile.addresssLine3"
          label="Address Line 3"
          value={addressLine3}
          onChange={onAddressLine3Change}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="seller.profile.landmark"
          label="Landmark"
          value={landmark}
          onChange={onLandmarkChange}
          error={hasError(errors, 'landmark')}
          helperText={getError(errors, 'landmark')}
          required
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="seller.profile.city"
          label="City"
          value={city}
          error={hasError(errors, 'city')}
          helperText={getError(errors, 'city')}
          required
          onChange={onCityChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

AddressCardEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.object
};
