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
import { useDialogState, ReadOnlyField, EditDialog } from 'modules/common';
import PropTypes from 'prop-types';
import {
  useSellerBankingDetailsFormState,
  useSellerBankingDetailsOnChange,
  usePutSellerFinancialDetails
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

export const BankingDetails = ({ isMobile, seller, editable }) => {
  const classes = useStyles();
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const { putSellerFinancialDetails } = usePutSellerFinancialDetails();

  const {
    values,
    setFieldValue,
    handleSubmit,
    validateForm,
    errors,
    resetForm
  } = useSellerBankingDetailsFormState({
    seller,
    putSellerFinancialDetails
  });

  const formOnChange = useSellerBankingDetailsOnChange({ setFieldValue });

  const { panNumber, aadharNumber, bankAccountNumber, ifscCode } = values;

  const onSaveClick = useCallback(() => {
    handleSubmit();
    closeEditDialog();
  }, [closeEditDialog, handleSubmit]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography className={classes.heading} variant="h5">
            {resourceLabel.bankingDetails}
          </Typography>
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
            <ReadOnlyField label={resourceLabel.panNumber} value={panNumber} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.aadharNumber}
              value={aadharNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.bankAccountNumber}
              value={bankAccountNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField label={resourceLabel.ifscCode} value={ifscCode} />
          </Grid>
        </Grid>
      </Paper>
      {editable && isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={BankingDetailsEdit}
          fullScreen={isMobile}
          values={values}
          formOnChange={formOnChange}
          title={resourceLabel.bankingDetails}
          onSaveClick={onSaveClick}
          validateForm={validateForm}
          errors={errors}
          resetForm={resetForm}
        />
      ) : null}
    </div>
  );
};

BankingDetails.propTypes = {
  seller: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool,
  editable: PropTypes.bool
};

export const BankingDetailsEdit = ({ values, formOnChange }) => {
  const { panNumber, aadharNumber, bankAccountNumber, ifscCode } = values;
  const {
    onPanNumberChange,
    onAadharNumberChange,
    onBankAccountNumberChange,
    onIfscCodeChange
  } = formOnChange;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="seller.profile.panNumber"
          label={resourceLabel.panNumber}
          value={panNumber}
          onChange={onPanNumberChange}
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
          id="seller.profile.aadharNumber"
          label={resourceLabel.aadharNumber}
          value={aadharNumber}
          onChange={onAadharNumberChange}
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
          id="seller.profile.bankAccountNumber"
          label={resourceLabel.bankAccountNumber}
          value={bankAccountNumber}
          onChange={onBankAccountNumberChange}
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
          id="seller.profile.ifscCode"
          label={resourceLabel.ifscCode}
          value={ifscCode}
          onChange={onIfscCodeChange}
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

BankingDetailsEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any)
};
