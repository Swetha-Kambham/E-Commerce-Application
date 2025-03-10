import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

export const ME = gql`
  query me {
    me {
      id
      name
      role
      emailAddress
      phoneNumber {
        countryCode
        phoneNumber
      }
    }
  }
`;

export const useMe = () => {
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'network-only'
  });

  const me = get(data, 'me', {});

  return { me, loading, refetch };
};
