import { gql, useApolloClient } from '@apollo/client';
import get from 'lodash.get';
import { useCallback } from 'react';

export const REQUEST_VERIFICATION_CODE = gql`
  query requestVerificationCode(
    $role: Role!
    $id: String
    $phoneNumber: PhoneNumberInput
    $emailAddress: String
  ) {
    requestVerificationCode(
      role: $role
      id: $id
      phoneNumber: $phoneNumber
      emailAddress: $emailAddress
    ) {
      phoneNumber {
        countryCode
        phoneNumber
      }
      serviceSId
    }
  }
`;

export const useRequestVerificationCode = ({ setFieldError }) => {
  const client = useApolloClient();

  const requestVerificationCode = useCallback(
    async ({ role, phoneNumber, emailAddress }) => {
      const { data, errors } = await client.query({
        query: REQUEST_VERIFICATION_CODE,
        variables: { role, phoneNumber, emailAddress },
        errorPolicy: 'all',
        fetchPolicy: 'network-only'
      });

      if (errors && errors.length) {
        const { message } = errors[0] || {};
        setFieldError('accountExists', message);
      }

      const verificationDetails = get(data, 'requestVerificationCode', {});
      return verificationDetails;
    },
    [client, setFieldError]
  );

  return { requestVerificationCode };
};
