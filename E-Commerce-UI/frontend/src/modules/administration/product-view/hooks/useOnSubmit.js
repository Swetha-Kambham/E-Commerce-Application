import { useCallback } from 'react';

export const useOnSubmit = ({
  setSaving,
  onClose,
  viewId,
  addOrUpdateProductUnitsToProductView,
  selectedProductUnits
}) => {
  const onSubmit = useCallback(async () => {
    setSaving(true);
    await addOrUpdateProductUnitsToProductView({
      id: viewId,
      productUnits: selectedProductUnits
    });
    setSaving(false);
    onClose();
  }, [
    addOrUpdateProductUnitsToProductView,
    onClose,
    selectedProductUnits,
    setSaving,
    viewId
  ]);
  return { onSubmit };
};
