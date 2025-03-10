import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

export const USER_ADDRESSES = gql`
  query userAddresses($id: String!) {
    user(id: $id) {
      id
      addresses {
        id
        name
        phoneNumber {
          countryCode
          phoneNumber
        }
        addressLine1
        addressLine2
        addressLine3
        city
        landmark
        state {
          id
          name
        }
        pinCode
      }
    }
  }
`;

export const useAddresses = ({ userId }) => {
  const { loading, data } = useQuery(USER_ADDRESSES, {
    variables: {
      id: userId
    },
    skip: !userId,
    fetchPolicy: 'cache-and-network'
  });

  const addresses = get(data, 'user.addresses', []);

  return {
    loading,
    addresses
  };
};
