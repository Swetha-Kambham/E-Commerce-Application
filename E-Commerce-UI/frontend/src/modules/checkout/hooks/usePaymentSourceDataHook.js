import { useState, useCallback } from 'react';

export const usePaymentSourceDataHook = () => {
  const [values, setValues] = useState({
    isUserActionRequired: false,
    userActionDetailMessage: null
  });
  const [error, setError] = useState({});

  const setPaymentSourceData = useCallback(
    (paymentMethod, sourceData) => {
      if (!paymentMethod) return;
      setValues({ ...values, [paymentMethod]: sourceData });
    },
    [values]
  );

  const setUserActionReqired = useCallback(
    (isActionRequired, message) => {
      setValues({
        ...values,
        isUserActionRequired: isActionRequired,
        userActionDetailMessage: isActionRequired ? message : null
      });
    },
    [values]
  );

  return {
    values,
    setValues,
    setPaymentSourceData,
    error,
    setError,
    setUserActionReqired
  };
};
