import { useCallback } from 'react';

export const useFormOnBasicDetailsChange = ({ setFieldValue }) => {
  return {
    onNameChange: useCallback(
      (e) => {
        setFieldValue('name', e.target.value);
      },
      [setFieldValue]
    ),
    onCommonNameChange: useCallback(
      (e) => {
        setFieldValue('commonName', e.target.value);
      },
      [setFieldValue]
    ),
    onCategoryChange: useCallback(
      (value) => {
        setFieldValue('category', value);
      },
      [setFieldValue]
    )
  };
};
