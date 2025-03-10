import { useCallback, useState } from 'react';
import { Roles, twillioVerificationStatus } from 'modules/common/enums';
import {
  useInitPhoneVerification,
  useCompletePhoneVerification
} from 'modules/common';
import { useValidateInput } from './useValidateInput';

export const useRegistrationHook = ({
  validateForm,
  values,
  setSubmitting,
  OpenOTPDialog,
  setFieldError,
  role,
  handleSubmit
}) => {
  const [phoneVerificationToken, setPhoneVerificationToken] = useState({});
  const { initPhoneVerification } = useInitPhoneVerification();
  const { completePhoneVerification } = useCompletePhoneVerification();
  const { validatePhoneNumber, validateEmailAddress, validateStoreName } =
    useValidateInput({
      role,
      setFieldError
    });

  const onVerifyClick = useCallback(
    async (otp, failureCallback) => {
      const { phoneNumber } = values;
      const { serviceSId } = phoneVerificationToken;
      const result = await completePhoneVerification({
        verificationCode: otp,
        serviceSId,
        phoneNumber
      });

      if (
        result &&
        result.status &&
        result.status.toLowerCase() ===
          twillioVerificationStatus.approved.toLowerCase()
      ) {
        await handleSubmit();
      } else {
        failureCallback();
      }
    },
    [completePhoneVerification, handleSubmit, phoneVerificationToken, values]
  );

  const handleInitPhoneVerification = useCallback(
    async (callback) => {
      const { phoneNumber } = values;
      const data = await initPhoneVerification({ phoneNumber });
      if (data) {
        setPhoneVerificationToken(data);
        callback && callback();
      }
    },
    [initPhoneVerification, setPhoneVerificationToken, values]
  );

  const onCreateAcoountClick = useCallback(async () => {
    const { phoneNumber, emailAddress, storeName } = values;
    const err = await validateForm();
    if (Object.keys(err).length === 0) {
      setSubmitting(true);
      const validatePhoneNumberResult = await validatePhoneNumber(phoneNumber);
      const validateEmailAddressResult = await validateEmailAddress(
        emailAddress
      );
      const validateStoreNameResult =
        role === Roles.seller
          ? await validateStoreName(storeName)
          : Promise.resolve(true);

      if (
        validatePhoneNumberResult &&
        validateEmailAddressResult &&
        validateStoreNameResult
      ) {
        await handleInitPhoneVerification(OpenOTPDialog);
      }
      setSubmitting(false);
    }
    setTimeout(() => {
      setSubmitting(false);
    }, 10000);
  }, [
    OpenOTPDialog,
    handleInitPhoneVerification,
    role,
    setSubmitting,
    validateEmailAddress,
    validateForm,
    validatePhoneNumber,
    validateStoreName,
    values
  ]);
  return { onCreateAcoountClick, handleInitPhoneVerification, onVerifyClick };
};
