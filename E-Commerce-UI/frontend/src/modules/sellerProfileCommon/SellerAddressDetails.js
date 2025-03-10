import React, { useCallback } from 'react';
import {
  Paper,
  Grid,
  TextField,
  makeStyles,
  Typography,
  Button
} from '@material-ui/core';
import { resource } from 'modules/resources';
import {
  useDialogState,
  ReadOnlyField,
  EditDialog,
  StateDropdown
} from 'modules/common';
import PropTypes from 'prop-types';
import {
  useSellerAddressDetailsFormState,
  useSellerAddressDetailsOnChange,
  useUpdateSellerAddress
} from './hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: 'none'
    }
  },
  sectionTop: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  editButton: {
    marginLeft: 'auto',
    textTransform: 'none'
  }
}));

const {
  seller: { profile: resourceLabel }
} = resource;

export const SellerAddressDetails = ({ isMobile, seller, editable }) => {
  const classes = useStyles();
  const { updateSellerAddress } = useUpdateSellerAddress();
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const { address } = seller || {};
  const {
    pinCode,
    addressLine1,
    addressLine2,
    addressLine3,
    landmark,
    city,
    state
  } = address || {};

  const {
    values,
    setFieldValue,
    validateForm,
    errors,
    resetForm,
    handleSubmit
  } = useSellerAddressDetailsFormState({
    sellerId: seller.id,
    updateSellerAddress,
    address
  });
  const formOnChange = useSellerAddressDetailsOnChange({ setFieldValue });

  const onSaveClick = useCallback(async () => {
    await handleSubmit();
    closeEditDialog();
  }, [handleSubmit, closeEditDialog]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography variant="h5">{resourceLabel.storeAddress}</Typography>
          {editable ? (
            <Button
              onClick={openEditDialog}
              color="primary"
              variant="text"
              className={classes.editButton}
            >
              Edit
            </Button>
          ) : null}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField label={resourceLabel.pinCode} value={pinCode} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.addresssLine1}
              value={addressLine1}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.addresssLine2}
              value={addressLine2}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.addresssLine3}
              value={addressLine3}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField label={resourceLabel.landmark} value={landmark} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField label={resourceLabel.city} value={city} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.state}
              value={state && state.name}
            />
          </Grid>
        </Grid>
      </Paper>
      {isDialogOpen && editable ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={SellerAddressDetailsEdit}
          fullScreen={isMobile}
          values={values}
          formOnChange={formOnChange}
          title={resourceLabel.storeAddress}
          onSaveClick={onSaveClick}
          errors={errors}
          validateForm={validateForm}
          resetForm={resetForm}
        />
      ) : null}
    </div>
  );
};

SellerAddressDetails.propTypes = {
  seller: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool,
  editable: PropTypes.bool
};

export const SellerAddressDetailsEdit = ({ values, formOnChange }) => {
  const {
    address: {
      pinCode,
      addressLine1,
      addressLine2,
      addressLine3,
      landmark,
      city,
      state
    }
  } = values;
  const {
    onPinCodeChange,
    onAddressLine1Change,
    onAddressLine2Change,
    onAddressLine3Change,
    onLandmarkChange,
    onCityChange,
    onStateChange
  } = formOnChange;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="seller.profile.pinCode"
          label={resourceLabel.pinCode}
          value={pinCode}
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
          label={resourceLabel.state}
          onChange={onStateChange}
          selectedId={state && state.id}
          variant="outlined"
          noneOption={false}
          margin="dense"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="seller.profile.addresssLine1"
          label={resourceLabel.addresssLine1}
          value={addressLine1}
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
          label={resourceLabel.addresssLine2}
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
          label={resourceLabel.addresssLine3}
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
          label={resourceLabel.landmark}
          value={landmark}
          onChange={onLandmarkChange}
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
          label={resourceLabel.city}
          value={city}
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

SellerAddressDetailsEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any)
};
