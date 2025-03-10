import React, { useCallback, useMemo } from 'react';
import {
  Paper,
  Grid,
  TextField,
  makeStyles,
  Typography,
  Button
} from '@material-ui/core';
import {
  PhoneNumberField,
  ReadOnlyField,
  useDialogState,
  EditDialog,
  PhoneNumberFormatter
} from 'modules/common';
import PropTypes from 'prop-types';
import useAuthContext from 'modules/auth';
import { useIsMobile } from 'modules/common/hooks/useScreenSize';
import {
  useUserPersonalInfoFormState,
  useUserPersonalInfoOnChange
} from '../hooks';

const useStyles = makeStyles((theme) => ({
  paper: {
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

export const UserPersonalInfo = ({ editable = false }) => {
  const classes = useStyles();
  const { isMobile } = useIsMobile();
  const { me: user } = useAuthContext();
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const { name, dateOfBirth, emailAddress: email, phoneNumber } = user;

  const {
    values,
    setFieldValue,
    validateForm,
    errors,
    resetForm,
    handleSubmit
  } = useUserPersonalInfoFormState({
    user
  });
  const formOnChange = useUserPersonalInfoOnChange({ setFieldValue });

  const onSaveClick = useCallback(async () => {
    await handleSubmit();
    closeEditDialog();
  }, [handleSubmit, closeEditDialog]);

  const phoneNumberValue = useMemo(
    () => <PhoneNumberFormatter value={phoneNumber} />,
    [phoneNumber]
  );

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography variant="h5">Personal Information</Typography>
          {editable ? (
            <Button
              onClick={openEditDialog}
              color="primary"
              variant="text"
              className={classes.editButton}
              disabled={!editable}
            >
              Edit
            </Button>
          ) : null}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReadOnlyField label="Name" value={name} />
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField label="Email Address" value={email} />
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField label="Phone Number" value={phoneNumberValue} />
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField label="Date of Birth" value={dateOfBirth} />
          </Grid>
        </Grid>
      </Paper>
      {editable && isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={UserPersonalInfoEdit}
          fullScreen={isMobile}
          values={values}
          onSaveClick={onSaveClick}
          formOnChange={formOnChange}
          title="Personal Information"
          validateForm={validateForm}
          errors={errors}
          resetForm={resetForm}
        />
      ) : null}
    </>
  );
};

UserPersonalInfo.propTypes = {
  editable: PropTypes.bool
};

export const UserPersonalInfoEdit = ({ values, formOnChange }) => {
  const { name, dateOfBirth, email, phoneNumber } = values;
  const {
    onNameChange,
    onDateOfBirthChange,
    onEmailChange,
    onPhoneNumberChange
  } = formOnChange;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="user.profile.name"
          label="Name"
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
      <Grid item xs={12}>
        <TextField
          id="user.profile.emailAddress"
          label="Email Address"
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
      <Grid item xs={12}>
        <PhoneNumberField
          id="user.profile.phoneNumber"
          label="Phone Number"
          required
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          fullWidth
          margin="dense"
          shrink
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="user.profile.dateOfBirth"
          label="Date of Birth"
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
    </Grid>
  );
};

UserPersonalInfoEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any)
};
