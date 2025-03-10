import { useMemo } from 'react';
import { useFormik } from 'formik';

const getInitialValues = ({ productView }) => ({
  id: productView?.id || '',
  name: productView?.name || '',
  description: productView?.description || '',
  summary: productView?.summary || '',
  priority: productView?.priority || '',
  enabled: productView?.enabled || false,
  productUnits: (productView?.productUnits || []).map((productUnit) => ({
    productId: productUnit.productId,
    skuId: productUnit.skuId
  })),
  image: (productView?.images && productView?.images[0]) || {}
});

export const useFormState = ({ productView }) => {
  const initialValues = useMemo(
    () => getInitialValues({ productView }),
    [productView]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true
  });
};
