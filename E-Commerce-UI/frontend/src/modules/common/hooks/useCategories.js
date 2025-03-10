import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const CATEGORIES = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;

export const useCategories = () => {
  const { loading, data } = useQuery(CATEGORIES, {
    fetchPolicy: 'network-only'
  });

  const categories = get(data, 'categories', []);

  return {
    loading,
    categories
  };
};
