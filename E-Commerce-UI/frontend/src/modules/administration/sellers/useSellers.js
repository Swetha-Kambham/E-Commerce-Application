import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const SELLERS = gql`
  query sellers {
    sellers {
      id
      name
      storeName
      emailAddress
      phoneNumber {
        countryCode
        phoneNumber
      }
      enabled
    }
  }
`;

export const useSellers = () => {
  const { loading, data } = useQuery(SELLERS, {
    fetchPolicy: 'network-only'
  });

  const sellers = get(data, 'sellers', []);

  return {
    loading,
    sellers
  };
};
