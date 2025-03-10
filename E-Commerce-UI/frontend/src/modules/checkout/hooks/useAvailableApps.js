import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const APPS = gql`
  query apps {
    apps {
      id
      name
    }
  }
`;

export const useAvailableApps = () => {
  const { loading, data } = useQuery(APPS, {
    fetchPolicy: 'network-only'
  });

  const apps = get(data, 'apps', []);

  return {
    loading,
    apps
  };
};
