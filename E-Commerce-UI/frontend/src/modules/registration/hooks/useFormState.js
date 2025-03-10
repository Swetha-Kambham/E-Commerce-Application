import { useMemo, useCallback } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { resource } from 'modules/resources';
import { CountryCodes, Roles } from 'modules/common/enums';
import { useHistory } from 'react-router-dom';

const {
  registrationDialogContent: { validation: resourceLabel }
} = resource;

const getInitialValues = () => ({
  name: '',
  storeName: '',
  emailAddress: '',
  phoneNumber: { phoneNumber: '', countryCode: CountryCodes.INDIA },
  password: '',
  confirmPassword: ''
});

const buildValidationSchema = (role) =>
  object().shape({
    name: string()
      .min(2, resourceLabel.nameMinLength)
      .required('Name is required'),
    storeName: string()
      .min(2, resourceLabel.nameMinLength)
      .test(resourceLabel.match, 'Store Name is required', function (value) {
        return role === Roles.seller
          ? value !== null && value !== undefined && value !== ''
          : true;
      }),
    phoneNumber: object()
      .test(
        resourceLabel.match,
        'Phone Number is required',
        function ({ phoneNumber }) {
          return (
            phoneNumber !== null &&
            phoneNumber !== undefined &&
            phoneNumber !== ''
          );
        }
      )
      .test(
        resourceLabel.match,
        'must be of 10 digits',
        function ({ phoneNumber }) {
          return phoneNumber && phoneNumber.length === 10;
        }
      ),
    emailAddress: string()
      .required('Email address is required')
      .email(resourceLabel.emailAddress),
    password: string()
      .required('Password is required')
      .min(8, resourceLabel.passwordCriteria)
      .max(16, resourceLabel.passwordCriteria)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,16}$/,
        resourceLabel.passwordCriteria
      ),
    confirmPassword: string()
      .required('Confirm Password is required')
      .test(
        resourceLabel.match,
        resourceLabel.confirmPasswordNotMatch,
        function (value) {
          return value === this.parent.password;
        }
      )
  });

export const useFormState = ({
  putUser,
  putSeller,
  role,
  setShowSuccessAlert
}) => {
  const history = useHistory();
  const initialValues = useMemo(() => getInitialValues(), []);
  const validationSchema = useMemo(() => buildValidationSchema(role), [role]);

  const successCallback = useCallback(() => {
    setShowSuccessAlert(true);
    setTimeout(() => {
      if (role === Roles.user) history.push('/login');
      else if (role === Roles.seller) history.push(`/login?usr=${role}`);
    }, 3000);
  }, [history, role, setShowSuccessAlert]);

  return useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: useCallback(
      async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        const { name, storeName, emailAddress, phoneNumber, password } = values;

        if (role === Roles.user) {
          const res = await putUser({
            input: {
              name,
              emailAddress,
              phoneNumber,
              password
            }
          });
          if (res) {
            resetForm();
            setSubmitting(true);
            successCallback();
          }
        } else if (role === Roles.seller) {
          const res = await putSeller({
            input: {
              name,
              storeName,
              emailAddress,
              phoneNumber,
              password
            }
          });
          resetForm();
          if (res) {
            resetForm();
            setSubmitting(true);
            successCallback();
          }
        }
      },
      [role, putUser, successCallback, putSeller]
    )
  });
};
