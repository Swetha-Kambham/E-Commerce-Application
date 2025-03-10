import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const BASE_CURRENCY = gql`
  query baseCurrency {
    baseCurrency {
      id
      name
      symbol
      code
    }
  }
`;

export const useBaseCurrency = () => {
  const { data, loading } = useQuery(BASE_CURRENCY, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all'
  });

  const baseCurrency = get(data, 'baseCurrency', {});

  return { baseCurrency, loading };
};
