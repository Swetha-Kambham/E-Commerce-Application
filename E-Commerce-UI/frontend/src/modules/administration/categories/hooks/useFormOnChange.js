import { useCallback } from 'react';

export const useFormOnChange = ({ setFieldValue }) => {
  return {
    onNameChange: useCallback(
      (e) => {
        setFieldValue('name', e.target.value);
      },
      [setFieldValue]
    ),
    onDescriptionChange: useCallback(
      (e) => {
        setFieldValue('description', e.target.value);
      },
      [setFieldValue]
    ),
    onEnabledChange: useCallback(
      (e) => {
        setFieldValue('enabled', e.target.checked);
      },
      [setFieldValue]
    ),
    onParentChange: useCallback(
      (value) => {
        setFieldValue('parent', value);
      },
      [setFieldValue]
    )
  };
};
