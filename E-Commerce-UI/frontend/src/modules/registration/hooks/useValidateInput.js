import { useCallback } from 'react';
import { useApolloClient, gql } from '@apollo/client';

export const VALIDATE_PHONE_NUMBER = gql`
  query validatePhoneNumber($phoneNumber: PhoneNumberInput!, $role: Role!) {
    validatePhoneNumber(phoneNumber: $phoneNumber, role: $role)
  }
`;

export const VALIDATE_EMAIL_ADDRESS = gql`
  query validateEmailAddress($emailAddress: String!, $role: Role!) {
    validateEmailAddress(emailAddress: $emailAddress, role: $role)
  }
`;

export const VALIDATE_STORE_NAME = gql`
  query validateStoreName($storeName: String!) {
    validateStoreName(storeName: $storeName)
  }
`;

export const useValidateInput = ({ role, setFieldError }) => {
  const client = useApolloClient();

  const validatePhoneNumber = useCallback(
    async (phoneNumber) => {
      const { data } = await client.query({
        query: VALIDATE_PHONE_NUMBER,
        variables: {
          phoneNumber,
          role
        },
        errorPolicy: 'all',
        fetchPolicy: 'network-only'
      });
      if (data && data.validatePhoneNumber === false) {
        setFieldError('phoneNumber', 'This phone number is already used');
        return false;
      }
      return true;
    },
    [client, role, setFieldError]
  );
  const validateEmailAddress = useCallback(
    async (emailAddress) => {
      const { data } = await client.query({
        query: VALIDATE_EMAIL_ADDRESS,
        variables: {
          emailAddress,
          role
        },
        errorPolicy: 'all',
        fetchPolicy: 'network-only'
      });

      if (data && data.validateEmailAddress === false) {
        setFieldError('emailAddress', 'This email address is already used');
        return false;
      }
      return true;
    },
    [client, role, setFieldError]
  );

  const validateStoreName = useCallback(
    async (storeName) => {
      const { data } = await client.query({
        query: VALIDATE_STORE_NAME,
        variables: {
          storeName
        },
        errorPolicy: 'all',
        fetchPolicy: 'network-only'
      });

      if (data && data.validateStoreName === false) {
        setFieldError('storeName', 'This store name is alredy used');
        return false;
      }
      return true;
    },
    [client, setFieldError]
  );

  return {
    validatePhoneNumber,
    validateEmailAddress,
    validateStoreName
  };
};
