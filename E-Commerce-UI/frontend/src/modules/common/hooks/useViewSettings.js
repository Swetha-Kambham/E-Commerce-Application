import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const PRODUCTVIEWDETAILS = gql`
  query viewSettings($name: String) {
    viewSettings(name: $name) {
      id
      name
      settings {
        key
        value {
          uuid
        }
      }
    }
  }
`;

export const useViewSettings = ({ name }) => {
  const { loading, data } = useQuery(PRODUCTVIEWDETAILS, {
    variables: { name },
    skip: !name,
    fetchPolicy: 'cache-and-network'
  });

  const viewSettings = get(data, 'viewSettings', {});

  return {
    loading,
    viewSettings
  };
};
