import { useCallback } from 'react';

export const useFormOnChange = ({
  setFieldValue,
  setShowSuccessAlert,
  setErrors
}) => {
  return {
    onNameChange: useCallback(
      (e) => {
        setFieldValue('name', e.target.value, false);
        setErrors({});
      },
      [setErrors, setFieldValue]
    ),
    onStoreNameChange: useCallback(
      (e) => {
        setFieldValue('storeName', e.target.value, false);
        setErrors({});
      },
      [setErrors, setFieldValue]
    ),
    onEmailAddressChange: useCallback(
      (e) => {
        setFieldValue('emailAddress', e.target.value, false);
        setErrors({});
      },
      [setErrors, setFieldValue]
    ),
    onPhoneNumberChange: useCallback(
      (value) => {
        setFieldValue('phoneNumber.phoneNumber', value, false);
        setErrors({});
      },
      [setErrors, setFieldValue]
    ),
    onPasswordChange: useCallback(
      (e) => {
        setFieldValue('password', e.target.value, false);
        setErrors({});
      },
      [setErrors, setFieldValue]
    ),
    onConfirmPasswordChange: useCallback(
      (e) => {
        setFieldValue('confirmPassword', e.target.value, false);
        setErrors({});
      },
      [setErrors, setFieldValue]
    ),
    openSuccessAlert: useCallback(() => {
      setShowSuccessAlert(true);
    }, [setShowSuccessAlert]),
    closeSuccessAlert: useCallback(() => {
      setShowSuccessAlert(false);
    }, [setShowSuccessAlert])
  };
};
