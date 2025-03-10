import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const BANKS = gql`
  query banks {
    banks {
      id
      name
    }
  }
`;

export const useAvailableBank = () => {
  const { loading, data } = useQuery(BANKS, {
    fetchPolicy: 'network-only'
  });

  const banks = get(data, 'banks', []);

  return {
    loading,
    banks
  };
};
