import { useApolloClient, gql } from '@apollo/client';
import get from 'lodash.get';

const COMPLETE_PHONE_VERIFICATION = gql`
  query completePhoneVerification(
    $phoneNumber: PhoneNumberInput!
    $serviceSId: String!
    $verificationCode: String!
  ) {
    completePhoneVerification(
      phoneNumber: $phoneNumber
      serviceSId: $serviceSId
      verificationCode: $verificationCode
    ) {
      status
    }
  }
`;

export const useCompletePhoneVerification = () => {
  const client = useApolloClient();

  return {
    completePhoneVerification: async ({
      phoneNumber,
      serviceSId,
      verificationCode
    }) => {
      const { data } = await client.query({
        query: COMPLETE_PHONE_VERIFICATION,
        variables: { phoneNumber, serviceSId, verificationCode },
        errorPolicy: 'all',
        fetchPolicy: 'network-only'
      });
      const completePhoneVerificationResult = get(
        data,
        'completePhoneVerification',
        null
      );
      return completePhoneVerificationResult;
    }
  };
};
