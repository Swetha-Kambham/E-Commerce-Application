import { useCallback, useState } from 'react';
import { CountryCodes, loginStatusCode } from 'modules/common/enums';
import { debounce } from 'lodash';
import { Cookies } from 'react-cookie';

export const useFormState = () => {
  const [values, setValues] = useState({
    phoneNumber: {
      countryCode: CountryCodes.INDIA,
      phoneNumber: ''
    },
    password: '',
    rememberMe: false
  });

  const [loginError, setLoginError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  return {
    values,
    setValues,
    loginError,
    setLoginError,
    isAuthenticating,
    setIsAuthenticating
  };
};

export const useFormOnChange = ({ setLoginError, values, setValues }) => {
  const onPhoneNumberChange = useCallback(
    (value) => {
      setLoginError(null);
      setValues({
        ...values,
        phoneNumber: { ...values.phoneNumber, phoneNumber: value }
      });
    },
    [setValues, values, setLoginError]
  );

  const onPasswordChange = useCallback(
    (e) => {
      setLoginError(null);
      setValues({ ...values, password: e.target.value });
    },
    [setValues, values, setLoginError]
  );

  const onRememberMeChange = useCallback(
    (e) => {
      setValues({ ...values, rememberMe: e.target.checked });
    },
    [setValues, values]
  );

  const handleReset = useCallback(() => {
    setValues({
      phoneNumber: {
        countryCode: values.phoneNumber?.countryCode,
        phoneNumber: ''
      },
      password: '',
      rememberMe: false
    });
  }, [setValues, values.phoneNumber.countryCode]);

  return {
    onPhoneNumberChange,
    onPasswordChange,
    onRememberMeChange,
    handleReset
  };
};

export const useOnSubmit = ({
  login,
  values,
  setLoginError,
  handleReset,
  updateAuthContext,
  setIsAuthenticating
}) => {
  const cookies = new Cookies();
  const handleSignIn = useCallback(async () => {
    const { phoneNumber, password, rememberMe } = values;
    if (
      !phoneNumber ||
      !phoneNumber.countryCode ||
      !phoneNumber.phoneNumber ||
      !password
    ) {
      setLoginError('Please enter credentials...');
      return;
    }
    setIsAuthenticating(true);
    cookies.remove('token', { path: '/' });

    const loginRes = await login({
      password,
      phoneNumber
    });

    if (loginRes && loginRes.status === loginStatusCode.FAILURE) {
      setLoginError('Wrong username or password');
      setIsAuthenticating(false);
      handleReset();
      return;
    }
    if (
      loginRes &&
      loginRes.status === loginStatusCode.SUCCESS &&
      loginRes.id
    ) {
      const options = { path: '/' };
      if (rememberMe) options.maxAge = 604800;
      cookies.set('token', loginRes.jwt, options);

      const updateAuthDebounce = debounce(async () => {
        if (cookies.get('token')) {
          await updateAuthContext();
          setIsAuthenticating(false);
        } else {
          updateAuthDebounce();
        }
      }, 500);

      updateAuthDebounce();

      setTimeout(() => updateAuthDebounce.cancel(), 2000);
    }
  }, [
    cookies,
    handleReset,
    login,
    setIsAuthenticating,
    setLoginError,
    updateAuthContext,
    values
  ]);

  return { handleSignIn };
};
