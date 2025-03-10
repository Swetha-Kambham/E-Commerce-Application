import React from 'react';
import { makeStyles, TextField, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDialogState } from 'modules/common/hooks';
import { useFormOnChange } from './hooks';
import { ImageSection } from './ImageSection';
import { AddUpdateProductDialog } from './AddUpdateProductDialog';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 'unset'
  },
  imageSection: {
    display: 'flex',
    width: '100%'
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: '#e8e8e2',
    padding: theme.spacing(1)
  }
}));

export const ProductViewDetails = ({
  editable,
  values,
  setFieldValue,
  viewSettings
}) => {
  const classes = useStyles();
  const { openDialog, closeDialog, isDialogOpen } = useDialogState();
  const {
    onNameChange,
    onDescriptionChange,
    onPriorityChange,
    onSummaryChange
  } = useFormOnChange({
    setFieldValue
  });
  const { id, name, description, summary, priority, image, productUnits } =
    values;

  return (
    <>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="name"
            fullWidth
            required
            label="Name"
            value={name}
            onChange={onNameChange}
            InputProps={{
              readOnly: !editable
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="priority"
            fullWidth
            required
            label="Priority"
            value={priority}
            onChange={onPriorityChange}
            InputProps={{
              readOnly: !editable
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            fullWidth
            label="Description"
            value={description}
            onChange={onDescriptionChange}
            InputProps={{
              readOnly: !editable
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="summary"
            fullWidth
            label="Summary"
            value={summary}
            onChange={onSummaryChange}
            InputProps={{
              readOnly: !editable
            }}
            variant="filled"
          />
        </Grid>
        {editable && id ? (
          <Grid item xs={12}>
            <Button onClick={openDialog} color="primary" variant="contained">
              {productUnits && productUnits.length
                ? 'Update Product'
                : 'Add Product'}
            </Button>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <ImageSection
            image={image}
            setFieldValue={setFieldValue}
            editable={editable && !id}
          />
        </Grid>
      </Grid>
      {isDialogOpen ? (
        <AddUpdateProductDialog
          onClose={closeDialog}
          open={isDialogOpen}
          viewId={id}
          productUnits={productUnits}
        />
      ) : null}
    </>
  );
};

ProductViewDetails.propTypes = {
  editable: PropTypes.bool,
  values: PropTypes.objectOf(PropTypes.any),
  setFieldValue: PropTypes.func,
  viewSettings: PropTypes.object
};
