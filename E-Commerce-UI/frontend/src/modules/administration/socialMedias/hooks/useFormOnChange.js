import { useCallback } from 'react';

export const useFormOnChange = ({ setFieldValue }) => {
  return {
    onNameChange: useCallback(
      (e) => {
        setFieldValue('name', e.target.value);
      },
      [setFieldValue]
    ),
    onUrlChange: useCallback(
      (e) => {
        setFieldValue('url', e.target.value);
      },
      [setFieldValue]
    ),
    onEnabledChange: useCallback(
      (e) => {
        setFieldValue('enabled', e.target.checked);
      },
      [setFieldValue]
    )
  };
};
