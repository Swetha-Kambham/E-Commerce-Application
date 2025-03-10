import React, { useState, useMemo, useCallback } from 'react';
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
import { useUpdateSellerDetails } from './hooks';

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

export const GSTDetails = ({ isMobile, seller, editable }) => {
  const classes = useStyles();
  const { updateSellerDetails } = useUpdateSellerDetails();

  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const { gstNumber } = seller;
  const [values, setValues] = useState({ gstNumber });

  const onGSTChange = useCallback((event) => {
    setValues({ gstNumber: event.target.value });
  }, []);

  const resetForm = useCallback(() => {
    setValues({ gstNumber });
  }, [gstNumber]);

  const onSaveClick = useCallback(async () => {
    await updateSellerDetails({
      sellerId: seller.id,
      input: { gstNumber: values.gstNumber }
    });
    closeEditDialog();
  }, [updateSellerDetails, closeEditDialog, values.gstNumber, seller.id]);

  const formOnChange = useMemo(
    () => ({
      onGSTChange
    }),
    [onGSTChange]
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography className={classes.heading} variant="h5">
            {resourceLabel.gstDetails}
          </Typography>
          {editable ? (
            <Button
              onClick={openEditDialog}
              color="primary"
              variant="text"
              className={classes.editButton}
            >
              {resourceLabel.edit}
            </Button>
          ) : null}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField label={resourceLabel.gstNumber} value={gstNumber} />
          </Grid>
        </Grid>
      </Paper>
      {isDialogOpen && editable ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          fullScreen={isMobile}
          EditContent={GSTDetailsEdit}
          values={values}
          formOnChange={formOnChange}
          title={resourceLabel.gstDetails}
          onSaveClick={onSaveClick}
          resetForm={resetForm}
        />
      ) : null}
    </div>
  );
};

GSTDetails.propTypes = {
  seller: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool,
  editable: PropTypes.bool
};

export const GSTDetailsEdit = ({ values, formOnChange }) => {
  const { gstNumber } = values;
  const { onGSTChange } = formOnChange;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="seller.profile.gstNumber"
          label={resourceLabel.gstNumber}
          value={gstNumber}
          onChange={onGSTChange}
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

GSTDetailsEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any)
};
