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
    onSummaryChange: useCallback(
      (e) => {
        setFieldValue('summary', e.target.value);
      },
      [setFieldValue]
    ),
    onEnabledChange: useCallback(
      (e) => {
        setFieldValue('enabled', e.target.checked);
      },
      [setFieldValue]
    ),
    onPriorityChange: useCallback(
      (e) => {
        const { value } = e.target;
        if (/^[0-9]*$/.test(value)) setFieldValue('priority', value);
      },
      [setFieldValue]
    )
  };
};
