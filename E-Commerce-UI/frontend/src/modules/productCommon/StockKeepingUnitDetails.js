import React, { useMemo, useState, useEffect } from 'react';
import { Paper, makeStyles, Button } from '@material-ui/core';
import {
  EditDialog,
  DeleteConfirmationDialog,
  ConfirmationDialog
} from 'modules/common';
import PropTypes from 'prop-types';
import { resource } from 'modules/resources';
import { StockKeepingUnitDetailsEdit } from './StockKeepingUnitDetailsEdit';
import { Images } from './Images';
import {
  useEditStockOnChange,
  useEditStocksFormState,
  usePutProductSkus,
  useDeleteProductSku,
  useUpdateProductSKUPricePerUnit,
  useUpdateProductSKUSellingPricePerUnit,
  useUpdateProductSKUQuantity,
  useGetSignedUrls,
  useUploadImages,
  useStockKeepingUnitDetails,
  useDeleteImage
} from './hooks';
import { StockKeepingUnitDetailsComponent } from './StockKeepingUnitDetailsComponent';

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
  addButton: {
    marginLeft: theme.spacing(-2),
    marginTop: theme.spacing(2)
  },
  editDialogPaper: {
    [theme.breakpoints.between('md', 'lg')]: {
      width: '85%',
      maxWidth: 'unset'
    },
    [theme.breakpoints.up('lg')]: {
      width: '75%',
      maxWidth: 'unset'
    }
  },
  dialogContentRoot: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    overflow: 'hidden'
  }
}));

const { productCommon: resourceLabel } = resource;

export const StockKeepingUnitDetails = ({
  isMobile,
  sellerId,
  productId,
  refetchProduct,
  product,
  editable
}) => {
  const classes = useStyles();
  const editDialogContentClasses = useMemo(
    () => ({ root: classes.dialogContentRoot }),
    [classes.dialogContentRoot]
  );
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [selectedImageKey, setSelectedImageKey] = useState(null);
  const { refetchSignedUrls } = useGetSignedUrls({ productId });
  const { putProductSkus } = usePutProductSkus();
  const { deleteProductSKU } = useDeleteProductSku();
  const { deleteImage } = useDeleteImage();
  const { updateProductSKUPricePerUnit } = useUpdateProductSKUPricePerUnit();
  const { updateProductSKUSellingPricePerUnit } =
    useUpdateProductSKUSellingPricePerUnit();
  const { updateProductSKUQuantity } = useUpdateProductSKUQuantity();
  const editDialogClasses = useMemo(
    () => ({ paper: classes.editDialogPaper }),
    [classes.editDialogPaper]
  );

  const {
    values,
    setFieldValue,
    handleSubmit,
    validateForm,
    errors,
    resetForm
  } = useEditStocksFormState({
    putProductSkus,
    productId
  });
  const { productOptionAndValues, productSkus: skus } = product;

  useEffect(() => {
    setProductSkus(
      (skus || []).map((sku) => ({
        ...sku,
        originalQuantity: sku.quantity,
        originalPricePerUnit: sku.pricePerUnit,
        originalSellingPricePerUnit: sku.sellingPricePerUnit,
        images: sku.images.map((img) => ({ ...img, loading: true }))
      }))
    );
  }, [skus]);

  const [productSkus, setProductSkus] = useState([]);

  const formOnChange = useEditStockOnChange({
    setFieldValue,
    values,
    productOptions: productOptionAndValues
  });

  const {
    onImageLoad,
    handleQuantityChange,
    handlePricePerUnitChange,
    handleSellingPricePerUnitChange,
    onSaveClick,
    onSaveUnitConfirmClick,
    onDeleteUnitConfirmClick,
    onCancel,
    onUploadClick,
    onSaveUnitClick,
    onDeleteUnitClick,
    isDialogOpen,
    openEditDialog,
    closeEditDialog,
    isUploadDialogOpen,
    closeUploadDialog,
    isDeleteUnitConfirmationDialogOpen,
    isSaveUnitConfirmationDialogOpen,
    onDeleteImage,
    isDeleteImageConfirmationDialogOpen,
    handleDeleteImageConfirmationDialog
  } = useStockKeepingUnitDetails({
    productId,
    productSkus,
    setProductSkus,
    handleSubmit,
    selectedUnitId,
    setSelectedUnitId,
    selectedImageKey,
    setSelectedImageKey,
    deleteProductSKU,
    updateProductSKUQuantity,
    updateProductSKUPricePerUnit,
    updateProductSKUSellingPricePerUnit,
    deleteImage,
    refetchProduct
  });

  const { onSaveImages } = useUploadImages({
    refetchSignedUrls,
    images: values.images,
    setFieldValue,
    resetForm,
    closeUploadDialog,
    refetchProduct,
    sellerId,
    skuId: selectedUnitId
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <StockKeepingUnitDetailsComponent
          productSkus={productSkus}
          onUploadClick={onUploadClick}
          onSaveUnitClick={onSaveUnitClick}
          onDeleteUnitClick={onDeleteUnitClick}
          isMobile={isMobile}
          onImageLoad={onImageLoad}
          handleQuantityChange={handleQuantityChange}
          handlePricePerUnitChange={handlePricePerUnitChange}
          handleSellingPricePerUnitChange={handleSellingPricePerUnitChange}
          onDeleteImageClick={handleDeleteImageConfirmationDialog}
          editable={editable}
        />
        {editable ? (
          <Button
            onClick={openEditDialog}
            color="primary"
            variant="text"
            className={classes.addButton}
          >
            {productSkus && productSkus.length
              ? resourceLabel.addMore
              : resourceLabel.add}
          </Button>
        ) : null}
      </Paper>
      {editable && isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={StockKeepingUnitDetailsEdit}
          dialogContentClasses={editDialogContentClasses}
          values={values}
          productOptions={productOptionAndValues}
          fullScreen={isMobile}
          isMobile={isMobile}
          classes={editDialogClasses}
          errors={errors}
          formOnChange={formOnChange}
          onSaveClick={onSaveClick}
          validateForm={validateForm}
          title={resourceLabel.skuUnit}
          productId={productId}
          resetForm={resetForm}
        />
      ) : null}
      {editable && isUploadDialogOpen ? (
        <EditDialog
          open={isUploadDialogOpen}
          closeEditDialog={closeUploadDialog}
          fullScreen={isMobile}
          EditContent={Images}
          values={values}
          errors={errors}
          formOnChange={formOnChange}
          onSaveClick={onSaveImages}
          validateForm={validateForm}
          title={resourceLabel.uploadImages}
          productId={productId}
          skuId={selectedUnitId}
          resetForm={resetForm}
        />
      ) : null}
      {editable && isDeleteUnitConfirmationDialogOpen ? (
        <DeleteConfirmationDialog
          open={isDeleteUnitConfirmationDialogOpen}
          onClose={onCancel}
          onConfirmClick={onDeleteUnitConfirmClick}
          title="Delete Unit"
          message="Are you sure you want to delete unit"
        />
      ) : null}
      {editable && isSaveUnitConfirmationDialogOpen ? (
        <ConfirmationDialog
          open={isSaveUnitConfirmationDialogOpen}
          onClose={onCancel}
          onConfirmClick={onSaveUnitConfirmClick}
          title="Save Quantity and Price"
          message="Are you sure you want to save your changes?"
        />
      ) : null}
      {editable && isDeleteImageConfirmationDialogOpen ? (
        <DeleteConfirmationDialog
          open={isDeleteImageConfirmationDialogOpen}
          onClose={onCancel}
          onConfirmClick={onDeleteImage}
          title="Delete Image"
          message="Are you sure you want to delete this Image"
        />
      ) : null}
    </div>
  );
};

StockKeepingUnitDetails.propTypes = {
  productId: PropTypes.string,
  product: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool,
  sellerId: PropTypes.string,
  refetchProduct: PropTypes.func,
  editable: PropTypes.bool
};
