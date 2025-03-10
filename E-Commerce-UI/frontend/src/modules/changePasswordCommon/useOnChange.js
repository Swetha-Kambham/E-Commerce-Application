import { useCallback } from 'react';

export const useOnChange = ({
  setFieldValue,
  setErrors,
  setShowSuccessAlert
}) => {
  const onPasswordChange = useCallback(
    (e) => {
      setFieldValue('password', e.target.value, false);
      setErrors({});
    },
    [setErrors, setFieldValue]
  );
  const onConfirmPasswordChange = useCallback(
    (e) => {
      setFieldValue('confirmPassword', e.target.value, false);
      setErrors({});
    },
    [setErrors, setFieldValue]
  );
  const closeSuccessAlert = useCallback(() => {
    setShowSuccessAlert(false);
    setErrors({});
  }, [setErrors, setShowSuccessAlert]);

  return { onPasswordChange, onConfirmPasswordChange, closeSuccessAlert };
};
