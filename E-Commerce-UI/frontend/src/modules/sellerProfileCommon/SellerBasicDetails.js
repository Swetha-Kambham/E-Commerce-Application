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
  PhoneNumberField,
  ReadOnlyField,
  useDialogState,
  EditDialog
} from 'modules/common';
import PropTypes from 'prop-types';
import {
  useSellerBasicDetailsFormState,
  useSellerBasicDetailsOnChange,
  useUpdateSellerDetails
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

export const SellerBasicDetails = ({ isMobile, seller, editable }) => {
  const classes = useStyles();
  const { updateSellerDetails } = useUpdateSellerDetails();
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const {
    name,
    storeName,
    dateOfBirth,
    emailAddress: email,
    description,
    phoneNumber
  } = seller;

  const {
    values,
    setFieldValue,
    validateForm,
    errors,
    resetForm,
    handleSubmit
  } = useSellerBasicDetailsFormState({
    seller,
    updateSellerDetails
  });
  const formOnChange = useSellerBasicDetailsOnChange({ setFieldValue });

  const onSaveClick = useCallback(async () => {
    await handleSubmit();
    closeEditDialog();
  }, [handleSubmit, closeEditDialog]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography variant="h5">{resourceLabel.basicDetails}</Typography>
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
            <ReadOnlyField label={resourceLabel.sellerName} value={name} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.dateOfBirth}
              value={dateOfBirth}
            />
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField label={resourceLabel.storeName} value={storeName} />
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField
              label={resourceLabel.description}
              value={description}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField label={resourceLabel.emailAddress} value={email} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.phoneNumber}
              value={`${phoneNumber.countryCode} ${phoneNumber.phoneNumber}`}
            />
          </Grid>
        </Grid>
      </Paper>
      {editable && isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={SellerBasicDetailsEdit}
          fullScreen={isMobile}
          values={values}
          onSaveClick={onSaveClick}
          formOnChange={formOnChange}
          title={resourceLabel.basicDetails}
          validateForm={validateForm}
          errors={errors}
          resetForm={resetForm}
        />
      ) : null}
    </div>
  );
};

SellerBasicDetails.propTypes = {
  seller: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool,
  editable: PropTypes.bool
};

export const SellerBasicDetailsEdit = ({ values, formOnChange }) => {
  const { name, storeName, dateOfBirth, description, email, phoneNumber } =
    values;
  const {
    onNameChange,
    onStoreNameChange,
    onDateOfBirthChange,
    onEmailChange,
    onPhoneNumberChange,
    onDescriptionChange
  } = formOnChange;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="seller.profile.name"
          label={resourceLabel.sellerName}
          required
          value={name}
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
        <TextField
          id="seller.profile.dateOfBirth"
          label={resourceLabel.dateOfBirth}
          value={dateOfBirth}
          onChange={onDateOfBirthChange}
          fullWidth
          type="date"
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="seller.profile.storeName"
          label={resourceLabel.storeName}
          required
          value={storeName}
          onChange={onStoreNameChange}
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
          id="seller.profile.description"
          label={resourceLabel.description}
          value={description}
          onChange={onDescriptionChange}
          multiline
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="seller.profile.emailAddress"
          label={resourceLabel.emailAddress}
          value={email}
          onChange={onEmailChange}
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
          label={resourceLabel.phoneNumber}
          required
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          fullWidth
          margin="dense"
          shrink
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

SellerBasicDetailsEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any)
};
