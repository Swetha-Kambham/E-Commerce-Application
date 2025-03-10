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
import { CategoryDropdown } from 'modules/common/components';
import PropTypes from 'prop-types';
import { useDialogState, ReadOnlyField, EditDialog } from 'modules/common';
import {
  useProductBasicDetailsFormState,
  useFormOnBasicDetailsChange,
  useUpdateProductBasicDetails
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

const { productCommon: resourceLabel } = resource;

export const ProductBasicDetails = ({ isMobile, product, editable }) => {
  const classes = useStyles();
  const { updateProductBasicDetails } = useUpdateProductBasicDetails();
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const {
    values,
    setFieldValue,
    handleSubmit,
    validateForm,
    resetForm,
    errors
  } = useProductBasicDetailsFormState({
    product,
    updateProductBasicDetails,
    closeEditDialog
  });

  const { name, commonName, category, seller } = product;
  const formOnChange = useFormOnBasicDetailsChange({ setFieldValue });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography className={classes.heading} variant="h5">
            {resourceLabel.basic}
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
          <Grid item xs={12} sm={12} md={6}>
            <ReadOnlyField label={resourceLabel.name} value={name} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ReadOnlyField
              label={resourceLabel.commonName}
              value={commonName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ReadOnlyField
              label={resourceLabel.category}
              value={category.name}
            />
          </Grid>
          {!editable ? (
            <Grid item xs={12}>
              <ReadOnlyField
                label={resourceLabel.seller}
                value={seller.storeName}
              />
            </Grid>
          ) : null}
        </Grid>
      </Paper>
      {editable && isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={ProductBasicDetailsEdit}
          values={values}
          formOnChange={formOnChange}
          fullScreen={isMobile}
          title={resourceLabel.basic}
          onSaveClick={handleSubmit}
          errors={errors}
          validateForm={validateForm}
          resetForm={resetForm}
        />
      ) : null}
    </div>
  );
};

ProductBasicDetails.propTypes = {
  product: PropTypes.objectOf(PropTypes.any),
  editable: PropTypes.bool,
  isMobile: PropTypes.bool
};

export const ProductBasicDetailsEdit = ({
  values,
  formOnChange,
  errors = {}
}) => {
  const { onNameChange, onCommonNameChange, onCategoryChange } = formOnChange;
  const { name, commonName, category } = values;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <TextField
          id="product.name"
          label={resourceLabel.name}
          value={name}
          required
          error={Boolean(errors.name)}
          helperText={errors.name}
          onChange={onNameChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="product.commonName"
          required
          label={resourceLabel.commonName}
          value={commonName}
          error={Boolean(errors.commonName)}
          helperText={errors.commonName}
          onChange={onCommonNameChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <CategoryDropdown
          label={resourceLabel.selectCategory}
          selectedId={category.id}
          error={Boolean(errors.category)}
          helperText={errors.category}
          onChange={onCategoryChange}
          variant="outlined"
          noneOption={false}
          margin="dense"
        />
      </Grid>
    </Grid>
  );
};

ProductBasicDetailsEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
