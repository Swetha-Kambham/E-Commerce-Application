import React, { useState, useMemo, useCallback } from 'react';
import { Paper, Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { resource } from 'modules/resources';
import PropTypes from 'prop-types';
import {
  useDialogState,
  ReadOnlyField,
  EditDialog,
  RichTextEditor,
  RichText
} from 'modules/common';

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
  },
  descriptionLabel: {
    minWidth: theme.spacing(15)
  }
}));

const { productCommon: resourceLabel } = resource;

export const ProductDescription = ({
  isMobile,
  product: { description: desc, id },
  updateProductDescription,
  editable
}) => {
  const classes = useStyles();
  const [description, setDescription] = useState(desc || '');
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const onDescriptionChange = useCallback((newValue) => {
    setDescription(newValue);
  }, []);
  const values = useMemo(() => ({ description }), [description]);
  const formOnChange = useMemo(
    () => ({ onDescriptionChange }),
    [onDescriptionChange]
  );

  const onSaveClick = useCallback(async () => {
    const result = await updateProductDescription({
      productId: id,
      description
    });
    const { data } = result || {};
    if (data && data.updateProductDescription) {
      closeEditDialog();
    }
  }, [closeEditDialog, description, id, updateProductDescription]);

  const resetForm = useCallback(() => {
    setDescription(desc || '');
  }, [desc]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography className={classes.heading} variant="h5">
            {resourceLabel.productDescription}
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
          <Grid item xs={12} sm={12} md={12}>
            <RichText
              rawContent={description}
              // label={resourceLabel.description}
              // value={description}
              // className={classes.descriptionLabel}
            />
          </Grid>
        </Grid>
      </Paper>
      {editable && isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={ProductDescriptionEdit}
          values={values}
          formOnChange={formOnChange}
          fullScreen={isMobile}
          resetForm={resetForm}
          onSaveClick={onSaveClick}
          title={resourceLabel.productDescription}
        />
      ) : null}
    </div>
  );
};

ProductDescription.propTypes = {
  product: PropTypes.objectOf(PropTypes.any),
  updateProductDescription: PropTypes.func,
  editable: PropTypes.bool,
  isMobile: PropTypes.bool
};

export const ProductDescriptionEdit = ({
  values,
  formOnChange,
  errors = {}
}) => {
  const { onDescriptionChange } = formOnChange;
  const { description } = values;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <RichTextEditor
          onValueChange={onDescriptionChange}
          rawContent={description}
        />
      </Grid>
    </Grid>
  );
};

ProductDescriptionEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any)
};
