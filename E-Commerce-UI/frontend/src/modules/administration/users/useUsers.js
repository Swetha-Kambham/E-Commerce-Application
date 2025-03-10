import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const SELLERS = gql`
  query users {
    users {
      id
      name
      emailAddress
      phoneNumber {
        countryCode
        phoneNumber
      }
      enabled
    }
  }
`;

export const useUsers = () => {
  const { loading, data } = useQuery(SELLERS, {
    fetchPolicy: 'network-only'
  });

  const users = get(data, 'users', []);

  return {
    loading,
    users
  };
};
