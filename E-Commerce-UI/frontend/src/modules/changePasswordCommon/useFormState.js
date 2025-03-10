import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { Roles } from 'modules/common/enums';
import useAuthContext from 'modules/auth';

const buildValidationSchema = (role) =>
  object().shape({
    password: string()
      .required('Password is required')
      .min(
        8,
        'Must Contain 8 Characters, One Lowercase, One Number and one special case Character(@$!%*#?&_)'
      )
      .max(
        16,
        'Must Contain 8 Characters, One Lowercase, One Number and one special case Character(@$!%*#?&_)'
      )
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,16}$/,
        'Must Contain 8 Characters, One Lowercase, One Number and one special case Character(@$!%*#?&_)'
      ),
    confirmPassword: string()
      .required('Confirm Password is required')
      .test('match', 'Passwords does not matches', function (value) {
        return value === this.parent.password;
      })
  });

export const useFormState = ({
  role,
  updateUserPassword,
  updateSellerPassword,
  setShowSuccessAlert,
  successCallback
}) => {
  const { me } = useAuthContext();
  const onSubmit = useCallback(
    async (values, { resetForm, setSubmitting, validateForm }) => {
      const err = validateForm();

      if (Object.keys(err).length > 0) {
        return;
      }
      setSubmitting(true);
      const { password } = values;
      if (role === Roles.user) {
        const res = await updateUserPassword({
          userId: me.id,
          newPassword: password
        });
        if (res) {
          setSubmitting(false);
          setShowSuccessAlert(true);
          resetForm();
          successCallback && successCallback();
        }
      } else if (role === Roles.seller) {
        const res = await updateSellerPassword({
          sellerId: me.id,
          newPassword: password
        });
        if (res) {
          setSubmitting(false);
          setShowSuccessAlert(true);
          resetForm();
          successCallback && successCallback();
        }
      }

      setTimeout(() => {
        setSubmitting(false);
      }, 15000);
    },
    [
      me.id,
      role,
      setShowSuccessAlert,
      successCallback,
      updateSellerPassword,
      updateUserPassword
    ]
  );

  return useFormik({
    initialValues: { password: '', confirmPassword: '' },
    enableReinitialize: true,
    validationSchema: buildValidationSchema(role),
    onSubmit
  });
};
