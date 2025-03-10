import { useState, useCallback } from 'react';
import { isValidCvv, getMonthAndYear, removeSpaces } from './utils';

export const useCardPaymentFormInitialValues = () => {
  const [values, setValues] = useState({
    cardNumber: '',
    cvv: '',
    holder: '',
    validThru: null
  });

  return {
    values,
    setValues
  };
};

const mapCardData = (values) => {
  const { month, year } = getMonthAndYear(values.validThru);

  return {
    channel: 'link',
    card_number: removeSpaces(values.cardNumber),
    card_holder_name: values.holder,
    card_expiry_mm: month,
    card_expiry_yy: year,
    card_cvv: removeSpaces(values.cvv)
  };
};

export const useCardPaymentFormFormOnChange = ({
  values,
  setValues,
  setPaymentSourceData,
  paymentOption,
  errors,
  setError
}) => {
  const changePaymentSourceData = useCallback(() => {
    setPaymentSourceData(paymentOption, mapCardData(values));
  }, [paymentOption, setPaymentSourceData, values]);

  const onCardNumberChange = useCallback(
    (event) => {
      const { value } = event.target;
      setValues({
        ...values,
        cardNumber: value
      });
      if (errors) {
        setError({});
      }
    },
    [errors, setError, setValues, values]
  );

  const onCvvChange = useCallback(
    (event) => {
      const { value } = event.target;

      if (isValidCvv(value))
        setValues({
          ...values,
          cvv: value
        });
      if (errors) {
        setError({});
      }
    },
    [errors, setError, setValues, values]
  );

  const onValidThruChange = useCallback(
    (date) => {
      setValues({
        ...values,
        validThru: date
      });
      if (errors) {
        setError({});
      }
    },
    [errors, setError, setValues, values]
  );

  const onNameChange = useCallback(
    (event) => {
      const { value } = event.target;
      setValues({
        ...values,
        holder: value
      });
      if (errors) {
        setError({});
      }
    },
    [errors, setError, setValues, values]
  );

  return {
    onNameChange,
    onCardNumberChange,
    onCvvChange,
    onValidThruChange,
    changePaymentSourceData
  };
};
