import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const CATEGORY = gql`
  query category($id: String!) {
    category(id: $id) {
      id
      name
      description
      parent {
        id
        name
      }
      hierarchy
      hierarchyName
      enabled
    }
  }
`;

export const useGetCategory = ({ id }) => {
  const { loading, data } = useQuery(CATEGORY, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only'
  });

  const category = get(data, 'category', {});

  return {
    loading,
    category
  };
};
