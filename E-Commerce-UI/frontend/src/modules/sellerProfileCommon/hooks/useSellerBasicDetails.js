import { useMemo, useCallback } from 'react';
import { localDateStringToDateObject } from 'modules/common';
import { useFormik } from 'formik';
import { CountryCodes } from 'modules/common/enums';

const getInitialValues = ({ seller }) => ({
  name: seller.name || '',
  storeName: seller.storeName || '',
  description: seller.description || '',
  dateOfBirth: seller.dateOfBirth || null,
  email: seller.emailAddress || '',
  phoneNumber: seller.phoneNumber || {
    phoneNumber: '',
    countryCode: CountryCodes.INDIA
  }
});

export const useSellerBasicDetailsFormState = ({
  seller,
  updateSellerDetails
}) => {
  const initialValues = useMemo(() => getInitialValues({ seller }), [seller]);
  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      const {
        name,
        storeName,
        dateOfBirth,
        description,
        email: emailAddress,
        phoneNumber: { phoneNumber, countryCode }
      } = values;

      await updateSellerDetails({
        sellerId: seller.id,
        input: {
          name,
          storeName,
          description,
          dateOfBirth: localDateStringToDateObject(dateOfBirth),
          emailAddress,
          phoneNumber: { phoneNumber, countryCode }
        }
      });
      resetForm();
    },
    [updateSellerDetails, seller.id]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit
  });
};

export const useSellerBasicDetailsOnChange = ({ setFieldValue }) => {
  const onNameChange = useCallback(
    (event) => {
      setFieldValue('name', event.target.value);
    },
    [setFieldValue]
  );

  const onStoreNameChange = useCallback(
    (event) => {
      setFieldValue('storeName', event.target.value);
    },
    [setFieldValue]
  );

  const onDescriptionChange = useCallback(
    (event) => {
      setFieldValue('description', event.target.value);
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
    onDescriptionChange,
    onNameChange,
    onStoreNameChange,
    onDateOfBirthChange,
    onEmailChange
  };
};
