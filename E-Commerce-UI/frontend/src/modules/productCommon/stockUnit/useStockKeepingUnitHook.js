import { v4 } from 'uuid';
import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';
import { string, object, number, array } from 'yup';
import axios from 'axios';

const buildValidationSchema = () =>
  object().shape({
    code: string().required('Code is required'),
    quantity: number().required('Quantity is required').min(1),
    pricePerUnit: number().required('Price per unit is required').min(1),
    sellingPricePerUnit: number()
      .required('Selling Price per unit is required')
      .min(1)
      .test({
        message:
          'Selling Price Per Unit must be less than or equal to Price Per Unit',
        name: 'sellingPricePerUnit',
        test(val) {
          return this.parent.pricePerUnit >= val;
        }
      }),
    specifications: array()
      .test({
        message: 'Please select an option',
        name: 'specifications',
        test(val) {
          if (val.length === 1) {
            return true;
          }
          return !val.some((v) => !v.optionId);
        }
      })
      .test({
        message: 'Duplicate options not allowed',
        name: 'specifications',
        test(val) {
          const allOptions = val.map((v) => v.optionId).filter((v) => v);
          const uniqueOptions = new Set(allOptions);
          return allOptions.length === uniqueOptions.size;
        }
      })
      .test({
        message: 'Please select a value',
        name: 'specifications',
        test(val) {
          return !val.some((v) => v.optionId && !v.valueId);
        }
      }),
    images: array().test({
      message: 'Atleast two images is required',
      name: 'test',
      test(val) {
        return val.filter((v) => v && v.url).length >= 2;
      }
    })
  });

export const mapToValues = ({ sku, baseCurrency }) => ({
  id: sku?.id || v4(),
  code: sku?.code || '',
  quantity:
    sku?.quantity === null || sku?.quantity === undefined ? 1 : sku?.quantity,
  currency: sku?.currency || baseCurrency,
  pricePerUnit: sku?.pricePerUnit || 0.0,
  sellingPricePerUnit: sku?.sellingPricePerUnit || 0.0,
  specifications: sku?.specifications?.map((specification) => ({
    id: v4(),
    optionId: specification.optionId,
    valueId: specification.valueId,
    optionName: specification.option,
    valueName: specification.value
  })) || [{ id: v4(), optionId: '', valueId: '' }],
  images: sku?.images?.map((image) => ({ ...image, id: v4() })) || [
    { id: v4(), url: '' },
    { id: v4(), url: '' }
  ]
});

const getInitialValues = ({ sku, baseCurrency }) =>
  mapToValues({ sku, baseCurrency });

const uploadImages = ({ images, setFieldValue }) =>
  Promise.all(
    images.map((image, index) =>
      axios
        .request({
          headers: {
            'Content-Type': image?.file?.type || 'image/jpeg'
          },
          method: 'put',
          url: image.url,
          data: image?.file,
          onUploadProgress: (p) => {
            setFieldValue(`images[${index}].inProgress`, true);
            setFieldValue(
              `images[${index}].percentage`,
              (100 * p.loaded) / p.total
            );
          }
        })
        .then((res) => {
          setFieldValue(`images[${index}].inProgress`, false);
          setFieldValue(`images[${index}].percentage`, null);
        })
        .catch((err) => {
          setFieldValue(`images[${index}].inProgress`, false);
          setFieldValue(`images[${index}].percentage`, null);
          setFieldValue(
            `images[${index}].error`,
            'Error occured while uploading image'
          );
        })
    )
  );

export const useStockKeepingUnitFormState = ({
  productId,
  putProductSku,
  baseCurrency,
  isAddMode,
  getSignedUrlForProductSKUImages,
  closeEditDialog,
  refetchProduct
}) => {
  const initialValues = useMemo(
    () => getInitialValues({ baseCurrency }),
    [baseCurrency]
  );
  const validationSchema = useMemo(() => buildValidationSchema(), []);

  const onSubmit = useCallback(
    async (values, { resetForm, setFieldValue }) => {
      const { id } = await putProductSku({
        productId,
        skuId: isAddMode ? null : values.id,
        skuDetails: values
      });

      if (isAddMode) {
        const { images } = values;

        const signedUrls = await getSignedUrlForProductSKUImages({
          productId,
          skuId: id,
          images
        });

        if (signedUrls && signedUrls.length) {
          await uploadImages({
            images: images.map((image, index) => {
              const signedUrl = signedUrls[index];
              return { ...image, url: signedUrl.url };
            }),
            setFieldValue
          });
        }
      }

      await refetchProduct();

      resetForm();
      closeEditDialog();
    },
    [
      closeEditDialog,
      getSignedUrlForProductSKUImages,
      isAddMode,
      productId,
      putProductSku,
      refetchProduct
    ]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit
  });
};

export const useStockKeepingUnitOnChange = ({
  setFieldValue,
  values: { specifications, images }
}) => {
  return {
    onCodeChange: useCallback(
      (event) => {
        setFieldValue('code', event.target.value);
      },
      [setFieldValue]
    ),
    onQuantityChange: useCallback(
      (value) => {
        setFieldValue('quantity', value);
      },
      [setFieldValue]
    ),
    onPricePerUnitChange: useCallback(
      (value) => {
        setFieldValue('pricePerUnit', value);
      },
      [setFieldValue]
    ),
    onSellingPricePerUnitChange: useCallback(
      (value) => {
        setFieldValue('sellingPricePerUnit', value);
      },
      [setFieldValue]
    ),
    onAddSpecification: useCallback(() => {
      setFieldValue('specifications', [
        ...specifications,
        { id: v4(), optionId: '', valueId: '' }
      ]);
    }, [setFieldValue, specifications]),
    onRemoveSpecification: useCallback(
      (index) => () => {
        setFieldValue(
          'specifications',
          specifications.filter((_, i) => i !== index)
        );
      },
      [setFieldValue, specifications]
    ),
    onSpecificationOptionChange: useCallback(
      (index) => (option) => {
        setFieldValue(
          'specifications',
          specifications.map((spec, i) =>
            i === index ? { ...spec, optionId: option.id, valueId: '' } : spec
          )
        );
      },
      [setFieldValue, specifications]
    ),
    onSpecificationValueChange: useCallback(
      (index) => (value) => {
        setFieldValue(
          'specifications',
          specifications.map((spec, i) =>
            i === index ? { ...spec, valueId: value.id } : spec
          )
        );
      },
      [setFieldValue, specifications]
    ),
    onAddImageClick: useCallback(() => {
      setFieldValue('images', [...images, { id: v4(), url: '' }]);
    }, [images, setFieldValue]),
    onRemoveImageClick: useCallback(
      (index) => (event) => {
        setFieldValue(
          'images',
          images.filter((_, i) => i !== index)
        );
        event && event.stopPropagation && event.stopPropagation();
      },
      [images, setFieldValue]
    ),
    onClearImageClick: useCallback(
      (index) => (event) => {
        setFieldValue(
          'images',
          images.map((image, i) =>
            i === index ? { id: v4(), url: '' } : image
          )
        );
        event && event.stopPropagation && event.stopPropagation();
      },
      [images, setFieldValue]
    ),
    onFileChange: useCallback(
      (index) => (file, rejectedFile) => {
        const url = file ? URL.createObjectURL(file) : null;
        setFieldValue(`images[${index}].file`, file);
        setFieldValue(`images[${index}].url`, url);

        if (rejectedFile && rejectedFile.errors && rejectedFile.errors.length)
          setFieldValue(
            `images[${index}].error`,
            rejectedFile.errors[0].message
          );
        else setFieldValue(`images[${index}].error`, null);
      },
      [setFieldValue]
    )
  };
};
