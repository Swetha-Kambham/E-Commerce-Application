import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';

const getInitialValues = ({ seller: { financialDetails = {} } }) => ({
  id: (financialDetails && financialDetails.id) || null,
  panNumber: (financialDetails && financialDetails.panNumber) || '',
  aadharNumber: (financialDetails && financialDetails.aadharNumber) || '',
  bankAccountNumber:
    (financialDetails && financialDetails.bankAccountNumber) || '',
  ifscCode: (financialDetails && financialDetails.ifscCode) || ''
});

export const useSellerBankingDetailsFormState = ({
  seller,
  putSellerFinancialDetails
}) => {
  const initialValues = useMemo(() => getInitialValues({ seller }), [seller]);
  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      const { ifscCode, bankAccountNumber, panNumber, aadharNumber } = values;

      await putSellerFinancialDetails({
        sellerId: seller.id,
        sellerFinancialDetails: {
          ifscCode,
          bankAccountNumber,
          panNumber,
          aadharNumber
        }
      });
      resetForm();
    },
    [putSellerFinancialDetails, seller.id]
  );

  return useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit
  });
};

export const useSellerBankingDetailsOnChange = ({ setFieldValue }) => {
  const onPanNumberChange = useCallback(
    (event) => {
      setFieldValue('panNumber', event.target.value);
    },
    [setFieldValue]
  );

  const onAadharNumberChange = useCallback(
    (event) => {
      setFieldValue('aadharNumber', event.target.value);
    },
    [setFieldValue]
  );

  const onBankAccountNumberChange = useCallback(
    (event) => {
      setFieldValue('bankAccountNumber', event.target.value);
    },
    [setFieldValue]
  );

  const onIfscCodeChange = useCallback(
    (event) => {
      setFieldValue('ifscCode', event.target.value);
    },
    [setFieldValue]
  );
  return {
    onPanNumberChange,
    onAadharNumberChange,
    onBankAccountNumberChange,
    onIfscCodeChange
  };
};
