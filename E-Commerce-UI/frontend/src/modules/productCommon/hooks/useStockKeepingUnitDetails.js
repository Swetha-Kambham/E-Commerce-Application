import { useCallback } from 'react';
import { useDialogState } from 'modules/common';

export const useStockKeepingUnitDetails = ({
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
  refetchProduct,
  deleteImage
}) => {
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const {
    isDialogOpen: isUploadDialogOpen,
    openDialog: openUploadDialog,
    closeDialog: closeUploadDialog
  } = useDialogState(false);

  const {
    isDialogOpen: isDeleteUnitConfirmationDialogOpen,
    openDialog: openDeleteUnitConfirmationDialog,
    closeDialog: closeDeleteUnitConfirmationDialog
  } = useDialogState(false);

  const {
    isDialogOpen: isSaveUnitConfirmationDialogOpen,
    openDialog: openSaveUnitConfirmationDialog,
    closeDialog: closeSaveUnitConfirmationDialog
  } = useDialogState(false);

  const {
    isDialogOpen: isDeleteImageConfirmationDialogOpen,
    openDialog: openDeleteImageConfirmationDialog,
    closeDialog: closeDeleteImageConfirmationDialog
  } = useDialogState(false);

  const onImageLoad = useCallback(
    (imgIndex) => () => {
      setProductSkus(
        productSkus.map((s) => ({
          ...s,
          images: s.images.map((imge, imgeIndex) => ({
            ...imge,
            loading: imgIndex === imgeIndex ? false : imge.loading
          }))
        }))
      );
    },
    [productSkus, setProductSkus]
  );

  const handleQuantityChange = useCallback(
    (index) => (value) => {
      setProductSkus(
        productSkus.map((sku, i) =>
          i === index ? { ...sku, quantity: value } : sku
        )
      );
    },
    [productSkus, setProductSkus]
  );

  const handlePricePerUnitChange = useCallback(
    (index) => (value) => {
      setProductSkus(
        productSkus.map((sku, i) =>
          i === index ? { ...sku, pricePerUnit: value } : sku
        )
      );
    },
    [productSkus, setProductSkus]
  );

  const handleSellingPricePerUnitChange = useCallback(
    (index) => (value) => {
      setProductSkus(
        productSkus.map((sku, i) =>
          i === index ? { ...sku, sellingPricePerUnit: value } : sku
        )
      );
    },
    [productSkus, setProductSkus]
  );

  const onDeleteUnitClick = useCallback(
    (unitId) => () => {
      setSelectedUnitId(unitId);
      openDeleteUnitConfirmationDialog();
    },
    [openDeleteUnitConfirmationDialog, setSelectedUnitId]
  );

  const onSaveUnitClick = useCallback(
    (unitId) => () => {
      setSelectedUnitId(unitId);
      openSaveUnitConfirmationDialog();
    },
    [openSaveUnitConfirmationDialog, setSelectedUnitId]
  );

  const onUploadClick = useCallback(
    (unitId) => () => {
      setSelectedUnitId(unitId);
      openUploadDialog();
    },
    [openUploadDialog, setSelectedUnitId]
  );

  const onCancel = useCallback(() => {
    if (selectedUnitId) setSelectedUnitId(null);
    if (selectedImageKey) setSelectedImageKey(null);

    if (isDeleteUnitConfirmationDialogOpen) closeDeleteUnitConfirmationDialog();
    if (isSaveUnitConfirmationDialogOpen) closeSaveUnitConfirmationDialog();
    if (isDeleteImageConfirmationDialogOpen)
      closeDeleteImageConfirmationDialog();
  }, [
    closeDeleteUnitConfirmationDialog,
    isDeleteUnitConfirmationDialogOpen,
    isSaveUnitConfirmationDialogOpen,
    isDeleteImageConfirmationDialogOpen,
    closeSaveUnitConfirmationDialog,
    closeDeleteImageConfirmationDialog,
    selectedUnitId,
    setSelectedUnitId,
    selectedImageKey,
    setSelectedImageKey
  ]);

  const onDeleteUnitConfirmClick = useCallback(async () => {
    if (!selectedUnitId) {
      closeDeleteUnitConfirmationDialog();
      return;
    }
    await deleteProductSKU({ productId, skuId: selectedUnitId });
    closeDeleteUnitConfirmationDialog();
  }, [
    deleteProductSKU,
    closeDeleteUnitConfirmationDialog,
    productId,
    selectedUnitId
  ]);

  const onSaveUnitConfirmClick = useCallback(async () => {
    if (!selectedUnitId) {
      closeSaveUnitConfirmationDialog();
      return;
    }

    const unit = productSkus.find((u) => u.skuId === selectedUnitId);

    // eslint-disable-next-line eqeqeq
    if (unit.quantity != unit.originalQuantity) {
      await updateProductSKUQuantity({
        productId,
        skuId: unit.skuId,
        quantity: unit.quantity,
        refetchProduct: false
      });
    }

    // eslint-disable-next-line eqeqeq
    if (unit.pricePerUnit != unit.originalPricePerUnit) {
      await updateProductSKUPricePerUnit({
        productId,
        skuId: unit.skuId,
        pricePerUnit: unit.pricePerUnit,
        currencySymbol: unit.currencySymbol,
        refetchProduct: false
      });
    }

    // eslint-disable-next-line eqeqeq
    if (unit.sellingPricePerUnit != unit.originalSellingPricePerUnit) {
      await updateProductSKUSellingPricePerUnit({
        productId,
        skuId: unit.skuId,
        sellingPricePerUnit: unit.sellingPricePerUnit,
        refetchProduct: false
      });
    }

    if (refetchProduct) refetchProduct();

    closeSaveUnitConfirmationDialog();
  }, [
    selectedUnitId,
    closeSaveUnitConfirmationDialog,
    refetchProduct,
    updateProductSKUPricePerUnit,
    updateProductSKUSellingPricePerUnit,
    updateProductSKUQuantity,
    productSkus,
    productId
  ]);

  const onSaveClick = useCallback(async () => {
    await handleSubmit();
    closeEditDialog();
  }, [handleSubmit, closeEditDialog]);

  const handleDeleteImageConfirmationDialog = useCallback(
    (key) => () => {
      setSelectedImageKey(key);
      openDeleteImageConfirmationDialog();
    },
    [setSelectedImageKey, openDeleteImageConfirmationDialog]
  );

  const onDeleteImage = useCallback(async () => {
    await deleteImage({ key: selectedImageKey });
    closeDeleteImageConfirmationDialog();
  }, [deleteImage, selectedImageKey, closeDeleteImageConfirmationDialog]);

  return {
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
    openUploadDialog,
    closeUploadDialog,
    isDeleteUnitConfirmationDialogOpen,
    openDeleteUnitConfirmationDialog,
    closeDeleteUnitConfirmationDialog,
    isSaveUnitConfirmationDialogOpen,
    onDeleteImage,
    isDeleteImageConfirmationDialogOpen,
    handleDeleteImageConfirmationDialog
  };
};
