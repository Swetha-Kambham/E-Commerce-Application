import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: 'unset'
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

export const AdditionalDetails = ({ values, formOnChange }) => {
  const classes = useStyles();
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const { shippingOption } = values;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography variant="h5">
            {resourceLabel.additionalDetails}
          </Typography>
          <Button
            onClick={openEditDialog}
            color="primary"
            variant="text"
            className={classes.editButton}
          >
            {resourceLabel.edit}
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <ReadOnlyField
              label={resourceLabel.shippingOptions}
              value={shippingOption}
            />
          </Grid>
        </Grid>
      </Paper>
      {isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={AdditionalDetailsEdit}
          values={values}
          formOnChange={formOnChange}
          title={resourceLabel.additionalDetails}
        />
      ) : null}
    </div>
  );
};

AdditionalDetails.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any)
};

const AdditionalDetailsEdit = ({ values, formOnChange }) => {
  const { shippingOption } = values;
  const { onShippingOptionChange } = formOnChange;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="seller.profile.shippingOptions"
          label={resourceLabel.shippingOptions}
          value={shippingOption}
          onChange={onShippingOptionChange}
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

AdditionalDetailsEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any)
};
