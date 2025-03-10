import { v4 } from 'uuid';
import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';

const getInitialValues = () => ({
  skus: [],
  images: []
});

export const useEditStocksFormState = ({ putProductSkus, productId }) => {
  const initialValues = useMemo(() => getInitialValues({}), []);

  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      const { skus } = values;

      await putProductSkus({
        productId,
        skus
      });
      resetForm();
    },
    [productId, putProductSkus]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit
  });
};

export const useEditStockOnChange = ({
  setFieldValue,
  values: { skus, images }
}) => {
  return {
    onAddSKU: useCallback(() => {
      setFieldValue('skus', [
        ...skus,
        {
          skuId: v4(),
          quantity: 0,
          currencySymbol: 'INR',
          pricePerUnit: 0.0,
          sellingPricePerUnit: 0.0,
          variant: [
            { id: v4(), option: '', value: '', optionId: '', valueId: '' }
          ]
        }
      ]);
    }, [skus, setFieldValue]),

    onQuantityChange: useCallback(
      (index, value) => {
        setFieldValue(
          'skus',
          skus.map((sku, i) =>
            index === i ? { ...sku, quantity: value } : sku
          )
        );
      },
      [skus, setFieldValue]
    ),
    onPricePerUnitChange: useCallback(
      (index, value) => {
        setFieldValue(
          'skus',
          skus.map((sku, i) =>
            index === i ? { ...sku, pricePerUnit: value } : sku
          )
        );
      },
      [skus, setFieldValue]
    ),
    onSellingPricePerUnitChange: useCallback(
      (index, value) => {
        setFieldValue(
          'skus',
          skus.map((sku, i) =>
            index === i ? { ...sku, sellingPricePerUnit: value } : sku
          )
        );
      },
      [skus, setFieldValue]
    ),
    onProductSpecValueChange: useCallback(
      async (skuIndex, specificationsIndex, value) => {
        const newVal = skus.map((sku, i) =>
          skuIndex === i
            ? {
                ...sku,
                variant: sku.variant.map((item, itemIndex) =>
                  itemIndex === specificationsIndex
                    ? {
                        ...item,
                        valueId: value.id,
                        value: value.name
                      }
                    : item
                )
              }
            : sku
        );
        await setFieldValue('skus', newVal);
      },
      [skus, setFieldValue]
    ),
    onSpecKeyChange: useCallback(
      async (skuIndex, specificationsIndex, value) => {
        const newVal = skus.map((sku, i) =>
          skuIndex === i
            ? {
                ...sku,
                variant: sku.variant.map((item, itemIndex) =>
                  itemIndex === specificationsIndex
                    ? {
                        ...item,
                        value: '',
                        valueId: '',
                        optionId: value.id,
                        option: value.name
                      }
                    : item
                )
              }
            : sku
        );
        await setFieldValue('skus', newVal);
      },
      [skus, setFieldValue]
    ),
    onRemoveUnit: useCallback(
      (skuIndex) => {
        const newVal = skus.filter((sku, i) => skuIndex !== i);
        setFieldValue('skus', newVal);
      },
      [skus, setFieldValue]
    ),
    onAddSpec: useCallback(
      (skuIndex) => {
        const newVal = skus.map((sku, i) =>
          skuIndex === i
            ? {
                ...sku,
                variant: [
                  ...sku.variant,
                  { id: v4(), option: '', value: '', optionId: '', valueId: '' }
                ]
              }
            : sku
        );
        setFieldValue('skus', newVal);
      },
      [skus, setFieldValue]
    ),
    onRemoveSpec: useCallback(
      (skuIndex, specIndex) => {
        const newVal = skus.map((sku, i) =>
          skuIndex === i
            ? {
                ...sku,
                variant: sku.variant.filter((_, sIndex) => sIndex !== specIndex)
              }
            : sku
        );
        setFieldValue('skus', newVal);
      },
      [skus, setFieldValue]
    ),
    onAddImageClick: useCallback(
      (skuId) => {
        setFieldValue('images', [...images, { id: v4(), skuId }]);
      },
      [setFieldValue, images]
    ),
    onFileChange: useCallback(
      (index, file, rejectedFile) => {
        setFieldValue(`images[${index}].file`, file);

        if (rejectedFile && rejectedFile.errors && rejectedFile.errors.length)
          setFieldValue(
            `images[${index}].error`,
            rejectedFile.errors[0].message
          );
        else setFieldValue(`images[${index}].error`, null);
      },
      [setFieldValue]
    ),
    onRemove: useCallback(
      (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setFieldValue('images', newImages);
      },
      [setFieldValue, images]
    )
  };
};
