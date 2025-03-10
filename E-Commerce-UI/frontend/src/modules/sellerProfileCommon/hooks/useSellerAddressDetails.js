import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';

const getInitialValues = ({ address }) => ({
  address: address || {
    pinCode: '',
    addressLine1: '',
    addressLine2: null,
    addressLine3: null,
    landmark: '',
    city: '',
    state: {
      id: ''
    }
  }
});

export const useSellerAddressDetailsFormState = ({
  sellerId,
  updateSellerAddress,
  address: sellerAddress
}) => {
  const initialValues = useMemo(
    () => getInitialValues({ address: sellerAddress }),
    [sellerAddress]
  );

  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      const { address } = values;

      await updateSellerAddress({
        sellerId,
        address: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          addressLine3: address.addressLine3,
          landmark: address.landmark,
          city: address.city,
          pinCode: address.pinCode,
          stateId: address.state.id
        }
      });
      resetForm();
    },
    [sellerId, updateSellerAddress]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit
  });
};

export const useSellerAddressDetailsOnChange = ({ setFieldValue }) => {
  const onPinCodeChange = useCallback(
    (event) => {
      setFieldValue('address.pinCode', event.target.value);
    },
    [setFieldValue]
  );

  const onAddressLine1Change = useCallback(
    (event) => {
      setFieldValue('address.addressLine1', event.target.value);
    },
    [setFieldValue]
  );

  const onAddressLine2Change = useCallback(
    (event) => {
      setFieldValue('address.addressLine2', event.target.value);
    },
    [setFieldValue]
  );

  const onAddressLine3Change = useCallback(
    (event) => {
      setFieldValue('address.addressLine3', event.target.value);
    },
    [setFieldValue]
  );

  const onLandmarkChange = useCallback(
    (event) => {
      setFieldValue('address.landmark', event.target.value);
    },
    [setFieldValue]
  );

  const onCityChange = useCallback(
    (event) => {
      setFieldValue('address.city', event.target.value);
    },
    [setFieldValue]
  );

  const onStateChange = useCallback(
    (value) => {
      setFieldValue('address.state', value);
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
    onStateChange
  };
};
