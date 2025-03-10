import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import { resource } from 'modules/resources';

const { productCommon: resourceLabel } = resource;

const buildValidationSchema = () =>
  object().shape({
    name: string().required(resourceLabel.nameIsRequired),
    commonName: string().required(resourceLabel.commonNameIsRequired),
    category: object().test(
      'categoryIsRequired',
      resourceLabel.categoryIsRequired,
      function (value) {
        return value && value.id;
      }
    )
  });

const getInitialValues = ({ product = {}, sellerId }) => ({
  name: product.name || '',
  commonName: product.commonName || '',
  category: product.category || {},
  sellerId
});

export const useProductBasicDetailsFormState = ({
  product = {},
  putProduct,
  sellerId,
  history,
  path,
  closeEditDialog,
  updateProductBasicDetails,
  isAddMode
}) => {
  const initialValues = useMemo(() => getInitialValues({ sellerId, product }), [
    sellerId,
    product
  ]);

  const validationSchema = useMemo(() => buildValidationSchema(), []);

  const onSubmit = useCallback(
    async (values) => {
      const { name, commonName, category } = values;

      if (isAddMode) {
        const result = await putProduct({
          id: null,
          input: {
            name,
            commonName,
            categoryId: parseInt(category.id, 10),
            sellerId
          }
        });

        const { data } = result || {};

        if (data && data.putProduct && data.putProduct.id) {
          closeEditDialog();
          history.push(`${path}/${data.putProduct.id}/edit`);
        }
      } else {
        const result = await updateProductBasicDetails({
          productId: product.id,
          input: {
            name,
            commonName,
            categoryId: parseInt(category.id, 10)
          }
        });

        const { data } = result || {};
        if (data && data.updateProductBasicDetails) {
          closeEditDialog();
        }
      }
    },
    [
      putProduct,
      sellerId,
      history,
      path,
      closeEditDialog,
      updateProductBasicDetails,
      isAddMode,
      product.id
    ]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
    validationSchema
  });
};
