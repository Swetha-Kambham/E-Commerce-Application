import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  EditDialog,
  ViewDialog,
  DeleteConfirmationDialog
} from 'modules/common/components';
import { useDialogState, useBaseCurrency } from 'modules/common/hooks';
import { Button, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { StockKeepingUnitDetailsEdit2 as StockKeepingUnitDetailsEdit } from './StockKeepingUnitDetailsEdit2';
import {
  useStockKeepingUnitFormState,
  useStockKeepingUnitOnChange,
  mapToValues
} from './useStockKeepingUnitHook';
import { usePutProductSku2 } from './usePutProductSku2';
import { ProductSKUTable } from './ProductSKUTable';
import { useDeleteProductSku } from '../hooks/useDeleteProductSku';
import { useGetSignedUrlForProductSKUImages } from './useGetSignedUrlForProductSKUImages';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    margin: theme.spacing(2, 0, 0, 2)
  }
}));

export const StockKeepingUnitDetails2 = ({
  isMobile,
  sellerId,
  productId,
  refetchProduct,
  product,
  editable
}) => {
  const classes = useStyles();
  const [isAddMode, setIsAddMode] = useState(true);
  const { baseCurrency } = useBaseCurrency();
  const [selectedId, setSelectedId] = useState(null);
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const {
    isDialogOpen: isDeleteUnitConfirmationDialogOpen,
    openDialog: openDeleteUnitConfirmationDialogOpen,
    closeDialog: closeDeleteUnitConfirmationDialogOpen
  } = useDialogState(false);

  const { putProductSku } = usePutProductSku2();
  const { getSignedUrlForProductSKUImages } =
    useGetSignedUrlForProductSKUImages();
  const { deleteProductSKU } = useDeleteProductSku();

  const { productOptionAndValues, productSkus } = product;

  const formik = useStockKeepingUnitFormState({
    productId,
    putProductSku,
    baseCurrency,
    isAddMode,
    getSignedUrlForProductSKUImages,
    closeEditDialog,
    refetchProduct
  });
  const {
    values,
    errors,
    resetForm,
    validateForm,
    setFieldValue,
    handleSubmit,
    setValues,
    isSubmitting
  } = formik;

  const formOnChange = useStockKeepingUnitOnChange({ values, setFieldValue });

  const onRowClick = useCallback(
    (id) => {
      const sku = (productSkus || []).find((s) => s.id === id);
      if (sku) {
        setIsAddMode(false);
        setValues(mapToValues({ sku }), false);
        openEditDialog();
      }
    },
    [openEditDialog, productSkus, setValues]
  );

  const onAddNewUnitClick = useCallback(() => {
    setIsAddMode(true);
    setValues(mapToValues({ baseCurrency }), false);
    openEditDialog();
  }, [baseCurrency, openEditDialog, setValues]);

  const onDeleteSKUClick = useCallback(
    (id) => {
      setSelectedId(id);
      openDeleteUnitConfirmationDialogOpen();
    },
    [openDeleteUnitConfirmationDialogOpen]
  );

  const onDeleteSKUConfirmClick = useCallback(async () => {
    await deleteProductSKU({ productId, skuId: selectedId });
    closeDeleteUnitConfirmationDialogOpen();
  }, [
    closeDeleteUnitConfirmationDialogOpen,
    deleteProductSKU,
    productId,
    selectedId
  ]);

  const DialogToRender = useMemo(
    () => (editable ? EditDialog : ViewDialog),
    [editable]
  );

  return (
    <>
      {editable ? (
        <div className={classes.buttonContainer}>
          <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            color="primary"
            onClick={onAddNewUnitClick}
          >
            Add New Unit
          </Button>
        </div>
      ) : null}
      <ProductSKUTable
        productSkus={productSkus}
        onRowClick={onRowClick}
        onDeleteSKU={onDeleteSKUClick}
        editable={editable}
      />
      {isDialogOpen ? (
        <DialogToRender
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={StockKeepingUnitDetailsEdit}
          ViewContent={StockKeepingUnitDetailsEdit}
          values={values}
          productOptions={productOptionAndValues}
          fullScreen={isMobile}
          isMobile={isMobile}
          errors={errors}
          formOnChange={formOnChange}
          onSaveClick={handleSubmit}
          validateForm={validateForm}
          title="Edit Product Unit"
          productId={productId}
          resetForm={resetForm}
          isSubmitting={isSubmitting}
          editable={editable}
          isFullyEditable={isAddMode}
        />
      ) : null}
      {editable && isDeleteUnitConfirmationDialogOpen ? (
        <DeleteConfirmationDialog
          open={isDeleteUnitConfirmationDialogOpen}
          onClose={closeDeleteUnitConfirmationDialogOpen}
          onConfirmClick={onDeleteSKUConfirmClick}
          title="Delete Unit"
          message="Are you sure you want to delete unit"
        />
      ) : null}
    </>
  );
};

StockKeepingUnitDetails2.propTypes = {
  productId: PropTypes.string,
  product: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool,
  sellerId: PropTypes.string,
  refetchProduct: PropTypes.func,
  editable: PropTypes.bool
};
