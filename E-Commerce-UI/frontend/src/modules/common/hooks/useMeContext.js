import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const ME = gql`
  query me {
    me {
      id
      name
    }
  }
`;

export const useMeContext = () => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-first'
  });

  const me = get(data, 'me', {});

  return { me, loading };
};
