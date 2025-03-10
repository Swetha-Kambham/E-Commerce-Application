import { gql, useApolloClient } from '@apollo/client';
import get from 'lodash.get';
import { useCallback } from 'react';

export const VERIFY_VERIFICATION_CODE = gql`
  query verifyVerificationCode(
    $role: Role!
    $phoneNumber: PhoneNumberInput
    $emailAddress: String
    $serviceSId: String
    $verificationCode: String
    $channel: String
  ) {
    verifyVerificationCode(
      role: $role
      phoneNumber: $phoneNumber
      emailAddress: $emailAddress
      serviceSId: $serviceSId
      verificationCode: $verificationCode
      channel: $channel
    ) {
      id
      status
      jwt
      role
      loginName
    }
  }
`;

export const useVerifyVerificationCode = () => {
  const client = useApolloClient();

  const verifyVerificationCode = useCallback(
    async ({
      role,
      phoneNumber,
      emailAddress,
      serviceSId,
      verificationCode,
      channel
    }) => {
      const { data } = await client.query({
        query: VERIFY_VERIFICATION_CODE,
        variables: {
          role,
          phoneNumber,
          emailAddress,
          serviceSId,
          verificationCode,
          channel
        },
        errorPolicy: 'all',
        fetchPolicy: 'network-only'
      });

      const verificationDetails = get(data, 'verifyVerificationCode', {});
      return verificationDetails;
    },
    [client]
  );

  return { verifyVerificationCode };
};
