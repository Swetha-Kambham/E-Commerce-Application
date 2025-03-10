import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const PRODUCTVIEWS = gql`
  query getPageOfProductView(
    $page: Int!
    $pageSize: Int!
    $filters: ProductViewFilter
  ) {
    getPageOfProductView(page: $page, pageSize: $pageSize, filters: $filters) {
      id
      name
      description
      priority
      enabled
      images {
        key
        url
      }
      productUnits {
        productId
        skuId
      }
    }
  }
`;

export const usePageOfProductView = (page = 1, pageSize = 100, filters) => {
  const { loading, data, refetch, fetchMore } = useQuery(PRODUCTVIEWS, {
    variables: {
      page,
      pageSize,
      filters
    },
    fetchPolicy: 'network-only'
  });

  const productViews = get(data, 'getPageOfProductView', []);

  return {
    loading,
    productViews,
    refetch,
    fetchMore
  };
};
