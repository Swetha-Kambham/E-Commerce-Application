import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';
import { preferenceType } from 'modules/common/enums';

export const GET_PAGE_OF_PREFERENCES_FOR_USER = gql`
  query getPageOfPreferencesForUser(
    $page: Int!
    $pageSize: Int!
    $userId: String!
    $filter: PreferencesFilter
  ) {
    getPageOfPreferencesForUser(
      page: $page
      pageSize: $pageSize
      userId: $userId
      filter: $filter
    ) {
      id
      type
      userId
      skuId
      productId
      productName
      productSlug
      productCommonName
      productDescription
      category {
        id
        name
      }
      seller {
        id
        name
        storeName
      }
      currency {
        id
        symbol
        name
        code
      }
      pricePerUnit
      sellingPricePerUnit
      quantity
      images {
        key
        url
      }
    }
  }
`;

export const usePageOfPreferencesForUser = ({
  page = 1,
  pageSize = 50,
  userId,
  filter = { type: preferenceType.CART }
}) => {
  const { loading, data } = useQuery(GET_PAGE_OF_PREFERENCES_FOR_USER, {
    variables: {
      page,
      pageSize,
      userId,
      filter
    },
    skip: !userId,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'all'
  });

  const preferences = get(data, 'getPageOfPreferencesForUser', []);

  return {
    loading,
    preferences: (preferences || [])
      .map((item) => ({
        ...item,
        price: {
          amount: item.sellingPricePerUnit,
          currency: item.currency
        }
      }))
      .filter((item) => item && item.quantity > 0)
  };
};
