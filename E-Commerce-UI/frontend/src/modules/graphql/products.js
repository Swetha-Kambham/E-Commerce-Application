import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query products($page: Int!, $pageSize: Int, $filters: ProductFilters) {
    products(page: $page, pageSize: $pageSize, filters: $filters) {
      id
      name
      commonName
      tags
      locationTags
      seller {
        id
        name
        displayName: storeName
      }
      category {
        id
        name
      }
      status
      enabled
    }
  }
`;
