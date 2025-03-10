import { useMemo } from 'react';
import { useFormik } from 'formik';
import { CountryCodes } from 'modules/common/enums';
import { object, string } from 'yup';

const buildValidationSchema = (role) =>
  object().shape({
    phoneNumber: object()
      .test('Match', 'Please enter phone Number', function ({ phoneNumber }) {
        return Boolean(this.parent.emailAddress || phoneNumber);
      })
      .test('Match', 'must be of 10 digits', function ({ phoneNumber }) {
        return !phoneNumber || phoneNumber.length === 10;
      }),
    emailAddress: string().email('Please Enter a Valid Email Address')
  });
const getInitialValues = () => ({
  emailAddress: '',
  phoneNumber: { phoneNumber: '', countryCode: CountryCodes.INDIA },
  serviceSId: '',
  accountExists: false
});

export const useFormState = () => {
  const initialValues = useMemo(() => getInitialValues(), []);
  const validationSchema = useMemo(() => buildValidationSchema(), []);

  return useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema
  });
};
