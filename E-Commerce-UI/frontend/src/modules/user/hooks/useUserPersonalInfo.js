import { useMemo, useCallback } from 'react';
// import { localDateStringToDateObject } from 'modules/common';
import { useFormik } from 'formik';

const getInitialValues = ({ user }) => ({
  name: user.name || '',
  email: user.emailAddress || '',
  dateOfBirth: user.dateOfBirth || null,
  phoneNumber: user.phoneNumber || { countryCode: '+91', phoneNumber: '' }
});

export const useUserPersonalInfoFormState = ({ user }) => {
  const initialValues = useMemo(() => getInitialValues({ user }), [user]);
  // const onSubmit = useCallback(
  //   async (values, { resetForm }) => {
  //     const {
  //       name,
  //       storeName,
  //       dateOfBirth,
  //       description,
  //       email: emailAddress,
  //       phoneNumber,
  //       countryCode
  //     } = values;

  //     await updateSellerDetails({
  //       sellerId: seller.id,
  //       input: {
  //         name,
  //         storeName,
  //         description,
  //         dateOfBirth: localDateStringToDateObject(dateOfBirth),
  //         emailAddress,
  //         phoneNumber: `${countryCode}${phoneNumber}`
  //       }
  //     });
  //     resetForm();
  //   },
  //   [updateSellerDetails, seller.id]
  // );

  return useFormik({
    initialValues,
    enableReinitialize: true
    // onSubmit
  });
};

export const useUserPersonalInfoOnChange = ({ setFieldValue }) => {
  const onNameChange = useCallback(
    (event) => {
      setFieldValue('name', event.target.value);
    },
    [setFieldValue]
  );

  const onDateOfBirthChange = useCallback(
    (event) => {
      setFieldValue('dateOfBirth', event.target.value);
    },
    [setFieldValue]
  );

  const onEmailChange = useCallback(
    (event) => {
      setFieldValue('email', event.target.value);
    },
    [setFieldValue]
  );

  const onPhoneNumberChange = useCallback(
    (value) => {
      setFieldValue('phoneNumber.phoneNumber', value);
    },
    [setFieldValue]
  );

  return {
    onPhoneNumberChange,
    onNameChange,
    onDateOfBirthChange,
    onEmailChange
  };
};
