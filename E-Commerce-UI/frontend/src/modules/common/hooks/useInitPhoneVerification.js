import { useApolloClient, gql } from '@apollo/client';
import get from 'lodash.get';

const INIT_PHONE_VERIFICATION = gql`
  query initPhoneVerification($phoneNumber: PhoneNumberInput!) {
    initPhoneVerification(phoneNumber: $phoneNumber) {
      phoneNumber {
        countryCode
        phoneNumber
      }
      serviceSId
    }
  }
`;

export const useInitPhoneVerification = () => {
  const client = useApolloClient();

  return {
    initPhoneVerification: async ({ phoneNumber }) => {
      const { data } = await client.query({
        query: INIT_PHONE_VERIFICATION,
        variables: { phoneNumber },
        errorPolicy: 'all',
        fetchPolicy: 'network-only'
      });

      const initPhoneVerificationResult = get(
        data,
        'initPhoneVerification',
        null
      );

      return initPhoneVerificationResult;
    }
  };
};
