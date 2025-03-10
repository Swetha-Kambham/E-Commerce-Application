import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const STATES = gql`
  query states {
    states {
      id
      name
    }
  }
`;

export const useStates = () => {
  const { loading, data } = useQuery(STATES, {
    fetchPolicy: 'network-only'
  });

  const states = get(data, 'states', []);

  return {
    loading,
    states
  };
};
