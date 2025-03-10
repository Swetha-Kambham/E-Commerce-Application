import { useCallback } from 'react';
import { loginStatusCode } from 'modules/common/enums';
import { debounce } from 'lodash';
import { Cookies } from 'react-cookie';

export const useFormOnChange = ({ setFieldValue, setErrors, errors }) => {
  return {
    onEmailAddressChange: useCallback(
      (e) => {
        setFieldValue('emailAddress', e.target.value, false);
        if (Object.keys(errors).length) setErrors({});
      },
      [errors, setErrors, setFieldValue]
    ),
    onPhoneNumberChange: useCallback(
      (value) => {
        setFieldValue('phoneNumber.phoneNumber', value, false);
        if (Object.keys(errors).length) setErrors({});
      },
      [errors, setErrors, setFieldValue]
    )
  };
};

export const useResetPasswordHooks = ({
  verifyVerificationCode,
  role,
  phoneNumber,
  emailAddress,
  serviceSId,
  updateAuthContext,
  closeOTPDialog,
  setFieldValue,
  validateForm,
  OpenOTPDialog,
  requestVerificationCode,
  setSubmitting
}) => {
  const cookies = new Cookies();

  const passwordChangeCallback = useCallback(async () => {
    await cookies.remove('token', { path: '/' });
    await updateAuthContext();
  }, [cookies, updateAuthContext]);

  const getVerificationCode = useCallback(async () => {
    const verificationDetails = await requestVerificationCode({
      role,
      phoneNumber,
      emailAddress
    });

    if (verificationDetails && verificationDetails.serviceSId) {
      setFieldValue('serviceSId', verificationDetails.serviceSId);
      return verificationDetails;
    }

    return null;
  }, [emailAddress, phoneNumber, requestVerificationCode, role, setFieldValue]);

  const onGetVerificationCodeClick = useCallback(async () => {
    const err = await validateForm();
    if (Object.keys(err).length > 0) {
      return;
    }
    setSubmitting(true);

    const verificationDetails = await getVerificationCode();

    if (verificationDetails && verificationDetails.serviceSId) {
      setFieldValue('accountExists', true);
      OpenOTPDialog();
      setSubmitting(false);
    }
    setTimeout(() => {
      setSubmitting(false);
    }, 15000);
  }, [
    OpenOTPDialog,
    getVerificationCode,
    setFieldValue,
    setSubmitting,
    validateForm
  ]);

  const onVerifyClick = useCallback(
    async (otp, failureCallback) => {
      setSubmitting(true);
      const res = await verifyVerificationCode({
        role,
        phoneNumber,
        emailAddress,
        serviceSId,
        verificationCode: otp
      });

      if (res && res.status === loginStatusCode.FAILURE) {
        failureCallback && failureCallback();
        return;
      }

      if (res && res.status === loginStatusCode.SUCCESS && res.id) {
        closeOTPDialog();

        const options = { path: '/' };
        options.maxAge = 10 * 60;
        cookies.set('token', res.jwt, options);

        const updateAuthDebounce = debounce(async () => {
          if (cookies.get('token')) {
            await updateAuthContext();
            setSubmitting(false);
          } else {
            updateAuthDebounce();
          }
        }, 500);

        updateAuthDebounce();

        setTimeout(() => {
          updateAuthDebounce.cancel();
          setSubmitting(false);
        }, 2000);
      }
    },
    [
      closeOTPDialog,
      cookies,
      emailAddress,
      phoneNumber,
      role,
      serviceSId,
      setSubmitting,
      updateAuthContext,
      verifyVerificationCode
    ]
  );

  return {
    onVerifyClick,
    onGetVerificationCodeClick,
    getVerificationCode,
    passwordChangeCallback
  };
};
