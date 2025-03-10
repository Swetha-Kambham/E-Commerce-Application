import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';

const getInitialValues = ({ category }) => ({
  id: category.id || '',
  name: category.name || '',
  description: category.description || '',
  parent: category.parent || { id: '' },
  hierarchy: category.hierarchy || '',
  hierarchyName: category.hierarchyName || '',
  enabled: category.enabled || false
});

export const useFormState = ({ category, putCategory, id, onClose }) => {
  const initialValues = useMemo(
    () => getInitialValues({ category }),
    [category]
  );
  return useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: useCallback(
      async (values) => {
        const { name, description, parent, enabled } = values;
        await putCategory({
          id,
          categoryInput: {
            name,
            description,
            parentId: parseInt(parent.id),
            enabled
          }
        });
        onClose();
      },
      [putCategory, id, onClose]
    )
  });
};
