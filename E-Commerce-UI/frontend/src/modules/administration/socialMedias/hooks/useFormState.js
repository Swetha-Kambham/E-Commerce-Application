import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';

const getInitialValues = ({ socialMedia }) => ({
  id: socialMedia.id || '',
  name: socialMedia.name || '',
  url: socialMedia.url || '',
  enabled: socialMedia.enabled || false
});

export const useFormState = ({ socialMedia, putSocialMedia, id, onClose }) => {
  const initialValues = useMemo(() => getInitialValues({ socialMedia }), [
    socialMedia
  ]);
  return useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: useCallback(
      async (values) => {
        const { name, url, enabled } = values;
        await putSocialMedia({ id, input: { name, url, enabled } });
        onClose();
      },
      [putSocialMedia, id, onClose]
    )
  });
};
