import { useCallback } from 'react';
import { v4 } from 'uuid';

export const useProductOptionsOnChange = ({
  setFieldValue,
  values: { productOptions }
}) => {
  return {
    onAddOption: useCallback(() => {
      setFieldValue('productOptions', [
        ...productOptions,
        { id: v4(), optionName: '', optionValues: [{ value: '', id: v4() }] }
      ]);
    }, [productOptions, setFieldValue]),
    onAddValue: useCallback(
      (index) => {
        setFieldValue(
          'productOptions',
          productOptions.map((item, i) =>
            index === i
              ? {
                  ...item,
                  optionValues: [...item.optionValues, { value: '', id: v4() }]
                }
              : item
          )
        );
      },
      [productOptions, setFieldValue]
    ),
    onOptionChange: useCallback(
      (index, value) => {
        const newVal = productOptions.map((item, i) =>
          index === i
            ? {
                ...item,
                optionName: value
              }
            : item
        );
        setFieldValue('productOptions', newVal);
      },
      [productOptions, setFieldValue]
    ),
    onOptionValueChange: useCallback(
      (optionIndex, valueIndex, value) => {
        const newVal = productOptions.map((item, i) =>
          optionIndex === i
            ? {
                ...item,
                optionValues: item.optionValues.map((v, vIndex) =>
                  vIndex === valueIndex ? { ...v, value } : v
                )
              }
            : item
        );
        setFieldValue('productOptions', newVal);
      },
      [productOptions, setFieldValue]
    ),
    onRemoveOption: useCallback(
      (optionIndex) => {
        const newVal = productOptions.filter((item, i) => optionIndex !== i);
        setFieldValue('productOptions', newVal);
      },
      [productOptions, setFieldValue]
    ),
    onRemoveOptionValue: useCallback(
      (optionIndex, valueIndex) => {
        const newVal = productOptions.map((item, i) =>
          optionIndex === i
            ? {
                ...item,
                optionValues: item.optionValues.filter(
                  (v, vIndex) => vIndex !== valueIndex
                )
              }
            : item
        );
        setFieldValue('productOptions', newVal);
      },
      [productOptions, setFieldValue]
    )
  };
};
