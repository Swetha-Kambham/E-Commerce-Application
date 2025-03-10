import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';
import { array, object } from 'yup';

const findFirstDuplicateOption = (value) => {
  const filteredValue = value.filter((v) => v && v.optionName);
  const uniqueValues = filteredValue.reduce(
    (res, curr) => ({
      ...res,
      [curr.optionName.toLowerCase()]: res[curr.optionName.toLowerCase()]
        ? res[curr.optionName.toLowerCase()] + 1
        : 1
    }),
    {}
  );

  const duplicateOption = filteredValue.find(
    (v) => uniqueValues[v.optionName.toLowerCase()] > 1
  );

  return duplicateOption;
};

const buildValidationSchema = () =>
  object().shape({
    productOptions: array()
      .test({
        name: 'duplicateOptionName',
        message: ({ value }) => {
          const duplicateOption = findFirstDuplicateOption(value);
          return duplicateOption
            ? {
                optionId: duplicateOption.id,
                message: 'Option Name must be unique'
              }
            : null;
        },
        test: (value) => {
          return !findFirstDuplicateOption(value);
        }
      })
      .test({
        name: 'duplicateValueName',
        message: ({ value }) => {
          const filteredValue = value.filter((v) => v && v.optionName);
          const uniqueIds = filteredValue.reduce(
            (res, curr) => ({
              ...res,
              [curr.id]: res[curr.id] ? res[curr.id] + 1 : 1
            }),
            {}
          );

          const duplicateOption = filteredValue.find(
            (v) => uniqueIds[v.id] > 1
          );
          return duplicateOption ? { optionId: duplicateOption.id } : null;
        },
        test: (options) => {
          return true;
        }
      })
  });

const getInitialValues = () => ({
  productOptions: []
});

export const useAddProductOptionsFormState = ({
  putProductOptionAndValues,
  productId
}) => {
  const initialValues = useMemo(() => getInitialValues(), []);
  const validationSchema = useMemo(() => buildValidationSchema(), []);

  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      const { productOptions } = values;

      await putProductOptionAndValues({
        input: {
          productId,
          productOptionValue: productOptions.map((option) => ({
            optionName: option.optionName,
            values: option.optionValues.map((value) => value.value)
          }))
        }
      });
      resetForm();
    },
    [productId, putProductOptionAndValues]
  );

  return useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit
  });
};
