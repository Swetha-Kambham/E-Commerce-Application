import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';
import { string, object } from 'yup';

const buildValidationSchema = () =>
  object().shape({
    name: string().required('Name is required'),
    phoneNumber: object()
      .test({
        message: 'Phone Number is required',
        test: (phoneNumber) => {
          return phoneNumber && phoneNumber.phoneNumber;
        }
      })
      .test({
        message: 'Must be of 10 digit',
        test: (phoneNumber) => {
          return /^[1-9]{1}[0-9]{9}$/.test(phoneNumber.phoneNumber);
        }
      }),
    pinCode: string().required('Pin Code is required'),
    state: object().test({
      message: 'State is required',
      test: (state) => {
        return state && state.id;
      }
    }),
    addressLine1: string().required('Address Line1 is required'),
    landmark: string().required('Landmark is required'),
    city: string().required('City is required')
  });

const getInitialValues = ({ address = {} }) => ({
  id: address.id || '',
  name: address.name || '',
  phoneNumber: address.phoneNumber || { countryCode: '+91', phoneNumber: '' },
  pinCode: address.pinCode || '',
  addressLine1: address.addressLine1 || '',
  addressLine2: address.addressLine2 || '',
  addressLine3: address.addressLine3 || '',
  landmark: address.landmark || '',
  city: address.city || '',
  state: address.state || {
    id: ''
  }
});

export const useAddressFormState = ({
  address,
  putAddress,
  userId,
  isAddMode,
  handleCloseEditDialog
}) => {
  const initialValues = useMemo(() => getInitialValues({ address }), [address]);
  const validationSchema = useMemo(() => buildValidationSchema(), []);

  const onSubmit = useCallback(
    async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      const {
        id,
        name,
        phoneNumber,
        pinCode,
        addressLine1,
        addressLine2,
        addressLine3,
        landmark,
        city,
        state: { id: stateId }
      } = values;

      const addressInput = {
        name,
        phoneNumber: {
          countryCode: phoneNumber.countryCode,
          phoneNumber: phoneNumber.phoneNumber
        },
        pinCode,
        addressLine1,
        addressLine2,
        addressLine3,
        landmark,
        city,
        stateId
      };

      if (isAddMode) {
        const res = await putAddress({
          userId,
          address: addressInput
        });

        if (res) {
          setSubmitting(false);
          resetForm();
          handleCloseEditDialog();
        }
      } else {
        const res = await putAddress({
          userId,
          addressId: id,
          address: addressInput
        });

        if (res) {
          setSubmitting(false);
          resetForm();
          handleCloseEditDialog();
        }
      }
    },
    [handleCloseEditDialog, isAddMode, putAddress, userId]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit
  });
};

export const useAddressOnChange = ({ setFieldValue }) => {
  const onPinCodeChange = useCallback(
    (event) => {
      setFieldValue('pinCode', event.target.value);
    },
    [setFieldValue]
  );

  const onAddressLine1Change = useCallback(
    (event) => {
      setFieldValue('addressLine1', event.target.value);
    },
    [setFieldValue]
  );

  const onAddressLine2Change = useCallback(
    (event) => {
      setFieldValue('addressLine2', event.target.value);
    },
    [setFieldValue]
  );

  const onAddressLine3Change = useCallback(
    (event) => {
      setFieldValue('addressLine3', event.target.value);
    },
    [setFieldValue]
  );

  const onLandmarkChange = useCallback(
    (event) => {
      setFieldValue('landmark', event.target.value);
    },
    [setFieldValue]
  );

  const onCityChange = useCallback(
    (event) => {
      setFieldValue('city', event.target.value);
    },
    [setFieldValue]
  );

  const onNameChange = useCallback(
    (event) => {
      setFieldValue('name', event.target.value);
    },
    [setFieldValue]
  );

  const onStateChange = useCallback(
    (value) => {
      setFieldValue('state', value);
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
    onPinCodeChange,
    onAddressLine1Change,
    onAddressLine2Change,
    onAddressLine3Change,
    onLandmarkChange,
    onCityChange,
    onStateChange,
    onPhoneNumberChange,
    onNameChange
  };
};
