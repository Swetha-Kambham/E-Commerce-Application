import React, { useCallback, useState, useMemo } from 'react';
import {
  Paper,
  Grid,
  TextField,
  makeStyles,
  Typography,
  Button,
  Tooltip,
  IconButton,
  TableRow,
  TableCell,
  Divider
} from '@material-ui/core';
import { resource } from 'modules/resources';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {
  useDialogState,
  EditDialog,
  NoDataMessage,
  DeleteConfirmationDialog
} from 'modules/common';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import clsx from 'clsx';
import { DeleteOption, MultiValueChip } from './formatters';
import {
  useDeleteProductOption,
  useDeleteProductOptionValue,
  useAddProductOptionsFormState,
  usePutProductOptionAndValues,
  useProductOptionsOnChange
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
  },
  addButton: {
    marginLeft: theme.spacing(-2),
    marginTop: theme.spacing(2)
  },
  cell: {
    borderBottom: 'none'
  },
  fixedWidthCell: {
    width: theme.spacing(15)
  },
  addOptions: {
    marginTop: theme.spacing(2)
  },
  addRemoveValueContainer: {
    display: 'flex'
  },
  removeValueIcon: {
    padding: theme.spacing(1.5, 0.5, 1.5, 0.5)
  },
  addValueIcon: { padding: theme.spacing(1.5, 0.5, 1.5, 0.5) },
  editDialogPaper: {
    [theme.breakpoints.up('md')]: {
      width: '75%',
      maxWidth: 'unset'
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%',
      maxWidth: 'unset'
    }
  }
}));

const { productCommon: resourceLabel } = resource;

export const ProductOptions = ({ isMobile, productId, product, editable }) => {
  const classes = useStyles();
  const { deleteProductOption } = useDeleteProductOption();
  const { deleteProductOptionValue } = useDeleteProductOptionValue();

  const { putProductOptionAndValues } = usePutProductOptionAndValues();
  const {
    values,
    setFieldValue,
    handleSubmit,
    validateForm,
    errors,
    resetForm
  } = useAddProductOptionsFormState({
    productId,
    putProductOptionAndValues
  });
  const formOnChange = useProductOptionsOnChange({ setFieldValue, values });

  const { productOptionAndValues } = product;
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [selectedOptionValue, setSelectedOptionValue] = useState({});

  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const {
    isDialogOpen: isDeleteOptionConfirmationDialogOpen,
    openDialog: openDeleteOptionConfirmationDialog,
    closeDialog: closeDeleteOptionConfirmationDialog
  } = useDialogState(false);

  const {
    isDialogOpen: isDeleteOptionValueConfirmationDialogOpen,
    openDialog: openDeleteOptionValueConfirmationDialog,
    closeDialog: closeDeleteOptionValueConfirmationDialog
  } = useDialogState(false);

  const editDialogClasses = useMemo(
    () => ({ paper: classes.editDialogPaper }),
    [classes.editDialogPaper]
  );

  const onDeleteOptionClick = useCallback(
    (optionId) => () => {
      setSelectedOptionId(optionId);
      openDeleteOptionConfirmationDialog();
    },
    [openDeleteOptionConfirmationDialog]
  );
  const onDeleteOptionValueClick = useCallback(
    (optionId, valueId) => () => {
      setSelectedOptionValue({ optionId, valueId });
      openDeleteOptionValueConfirmationDialog();
    },
    [openDeleteOptionValueConfirmationDialog]
  );

  const onCancel = useCallback(() => {
    if (selectedOptionId) setSelectedOptionId(null);

    if (selectedOptionValue && selectedOptionValue.optionId)
      setSelectedOptionValue({});

    if (isDeleteOptionConfirmationDialogOpen)
      closeDeleteOptionConfirmationDialog();

    if (isDeleteOptionValueConfirmationDialogOpen)
      closeDeleteOptionValueConfirmationDialog();
  }, [
    closeDeleteOptionConfirmationDialog,
    closeDeleteOptionValueConfirmationDialog,
    isDeleteOptionConfirmationDialogOpen,
    isDeleteOptionValueConfirmationDialogOpen,
    selectedOptionId,
    selectedOptionValue
  ]);

  const onDeleteOptionConfirmClick = useCallback(() => {
    if (selectedOptionId) {
      deleteProductOption({
        input: {
          productId,
          optionId: selectedOptionId
        }
      });
      closeDeleteOptionConfirmationDialog();
    }
  }, [
    selectedOptionId,
    deleteProductOption,
    productId,
    closeDeleteOptionConfirmationDialog
  ]);

  const onDeleteOptionValueConfirmClick = useCallback(() => {
    if (
      selectedOptionValue &&
      selectedOptionValue.optionId &&
      selectedOptionValue.valueId
    ) {
      deleteProductOptionValue({
        input: {
          ...selectedOptionValue,
          productId
        }
      });
      closeDeleteOptionValueConfirmationDialog();
    }
  }, [
    selectedOptionValue,
    deleteProductOptionValue,
    productId,
    closeDeleteOptionValueConfirmationDialog
  ]);

  const onSaveClick = useCallback(async () => {
    await handleSubmit();
    closeEditDialog();
  }, [handleSubmit, closeEditDialog]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography className={classes.heading} variant="h5">
            {resourceLabel.productOptions}
          </Typography>
        </div>
        <Grid>
          {productOptionAndValues && productOptionAndValues.length ? (
            <Divider variant="fullWidth" />
          ) : (
            <NoDataMessage message="No Options has been added" />
          )}
          {productOptionAndValues.map((option, index) => (
            <React.Fragment key={option.id}>
              <TableRow component="div">
                {editable ? (
                  <TableCell component="div" className={classes.cell}>
                    <DeleteOption onClick={onDeleteOptionClick(option.id)} />
                  </TableCell>
                ) : null}
                <TableCell
                  component="div"
                  className={clsx(classes.cell, classes.fixedWidthCell)}
                >
                  {option.optionName}
                </TableCell>
                <TableCell component="div" className={classes.cell}>
                  <MultiValueChip
                    optionId={option.id}
                    onDelete={editable ? onDeleteOptionValueClick : null}
                    values={option.values || []}
                  />
                </TableCell>
              </TableRow>
              <Divider variant="fullWidth" />
            </React.Fragment>
          ))}
        </Grid>
        {editable ? (
          <Button
            onClick={openEditDialog}
            color="primary"
            variant="text"
            className={classes.addButton}
          >
            {productOptionAndValues && productOptionAndValues.length
              ? resourceLabel.addMore
              : resourceLabel.add}
          </Button>
        ) : null}
      </Paper>
      {editable && isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={ProductOptionsEdit}
          values={values}
          errors={errors}
          classes={editDialogClasses}
          fullScreen={isMobile}
          isMobile={isMobile}
          formOnChange={formOnChange}
          onSaveClick={onSaveClick}
          validateForm={validateForm}
          title={resourceLabel.basic}
          productId={productId}
          resetForm={resetForm}
        />
      ) : null}
      {editable && isDeleteOptionConfirmationDialogOpen ? (
        <DeleteConfirmationDialog
          open={isDeleteOptionConfirmationDialogOpen}
          onClose={onCancel}
          onConfirmClick={onDeleteOptionConfirmClick}
          title="Delete Option"
          message="Are you sure you want to delete option"
        />
      ) : null}
      {editable && isDeleteOptionValueConfirmationDialogOpen ? (
        <DeleteConfirmationDialog
          open={isDeleteOptionValueConfirmationDialogOpen}
          onClose={onCancel}
          onConfirmClick={onDeleteOptionValueConfirmClick}
          title="Delete Option"
          message="Are you sure you want to delete value"
        />
      ) : null}
    </div>
  );
};

ProductOptions.propTypes = {
  productId: PropTypes.string,
  product: PropTypes.objectOf(PropTypes.any),
  editable: PropTypes.bool,
  isMobile: PropTypes.bool
};

export const ProductOptionsEdit = ({ isMobile, formOnChange, values }) => {
  const classes = useStyles();

  const {
    onAddOption,
    onAddValue,
    onOptionChange,
    onOptionValueChange,
    onRemoveOption,
    onRemoveOptionValue
  } = formOnChange;
  const { productOptions } = values;

  const onAddValueClick = useCallback(
    (index) => () => {
      onAddValue(index);
    },
    [onAddValue]
  );

  const handleOptionChange = useCallback(
    (index) => (e) => {
      onOptionChange(index, e.target.value);
    },
    [onOptionChange]
  );

  const handleOptionValueChange = useCallback(
    (optionIndex, valueIndex) => (e) => {
      onOptionValueChange(optionIndex, valueIndex, e.target.value);
    },
    [onOptionValueChange]
  );

  const handleRemoveOption = useCallback(
    (optionIndex) => (e) => {
      onRemoveOption(optionIndex);
    },
    [onRemoveOption]
  );

  const handleRemoveOptionValue = useCallback(
    (optionIndex, valueIndex) => (e) => {
      onRemoveOptionValue(optionIndex, valueIndex);
    },
    [onRemoveOptionValue]
  );

  return (
    <>
      <Grid container spacing={2}>
        {productOptions.map((option, index) => (
          <React.Fragment key={option.id}>
            {option.optionValues.map((v, i) => (
              <React.Fragment key={v.id}>
                {!isMobile ? (
                  <Grid item xs={2} sm={1} md={1}>
                    {i === 0 ? (
                      <Tooltip title={resourceLabel.removeOption}>
                        <IconButton
                          onClick={handleRemoveOption(index)}
                          color="secondary"
                          variant="contained"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </Grid>
                ) : null}
                {!isMobile || (isMobile && i === 0) ? (
                  <Grid item xs={10} sm={11} md={5}>
                    {i === 0 ? (
                      <TextField
                        label={resourceLabel.option}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={option.optionName}
                        onChange={handleOptionChange(index)}
                        variant="outlined"
                      />
                    ) : null}
                  </Grid>
                ) : null}
                {isMobile && i === 0 ? (
                  <Grid item xs={2} sm={1} md={1}>
                    <Tooltip title={resourceLabel.removeOption}>
                      <IconButton
                        onClick={handleRemoveOption(index)}
                        color="secondary"
                        variant="contained"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                ) : null}
                <Grid item xs={10} sm={11} md={5}>
                  <TextField
                    label={resourceLabel.value}
                    fullWidth
                    margin="dense"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={v.value}
                    onChange={handleOptionValueChange(index, i)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={2} sm={1} md={1}>
                  <div className={classes.addRemoveValueContainer}>
                    {i > 0 ? (
                      <Tooltip title={resourceLabel.removeValue}>
                        <IconButton
                          className={classes.addValueIcon}
                          onClick={handleRemoveOptionValue(index, i)}
                          color="secondary"
                          variant="contained"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {i === option.optionValues.length - 1 ? (
                      <Tooltip title={resourceLabel.addValue}>
                        <IconButton
                          className={classes.removeValueIcon}
                          onClick={onAddValueClick(index)}
                          color="secondary"
                          variant="contained"
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </div>
                </Grid>
              </React.Fragment>
            ))}
            {isMobile ? (
              <Grid item xs={12}>
                <Divider fullWidth />
              </Grid>
            ) : null}
          </React.Fragment>
        ))}
      </Grid>
      <Button
        className={classes.addOptions}
        color="secondary"
        variant="contained"
        onClick={onAddOption}
      >
        {resourceLabel.addOptions}
      </Button>
    </>
  );
};

ProductOptionsEdit.propTypes = {
  formOnChange: PropTypes.objectOf(PropTypes.any),
  values: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool
};
