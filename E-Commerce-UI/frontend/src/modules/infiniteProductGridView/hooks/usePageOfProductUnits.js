import { useCallback, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

export const PRODUCTUNITS = gql`
  query pageOfProductUnits(
    $page: Int!
    $pageSize: Int
    $filters: ProductFilters
  ) {
    pageOfProductUnits(page: $page, pageSize: $pageSize, filters: $filters) {
      id
      productId
      skuId
      sku
      slug
      name
      commonName
      seller {
        id
        name
        storeName
      }
      category {
        id
        name
      }
      pricePerUnit
      sellingPricePerUnit
      currency {
        id
        name
        symbol
        code
      }
      quantity: quantityInStock
      images {
        key
        url
      }
      specifications {
        option
        value
      }
    }
  }
`;

export const mapProductUnit = (u) => ({
  ...u,
  pricePerUnit: {
    amount: u.pricePerUnit,
    currency: u.currency
  },
  sellingPricePerUnit: {
    amount: u.sellingPricePerUnit,
    currency: u.currency
  },
  image: u.images && u.images[0] ? u.images[0] : {}
});

export const usePageOfProductUnits = ({
  page = 1,
  pageSize = 10,
  filters,
  skip = false
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, data, refetch, fetchMore, variables } = useQuery(
    PRODUCTUNITS,
    {
      variables: {
        page,
        pageSize,
        filters
      },
      skip,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first'
    }
  );

  const productUnits = get(data, 'pageOfProductUnits', []);

  const hasMore =
    productUnits &&
    productUnits.length !== 0 &&
    productUnits.length % variables.pageSize === 0;

  const loadMore = useCallback(async () => {
    if (!hasMore) return;

    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        ...variables,
        page: Math.ceil(productUnits.length / variables.pageSize) + 1
      },
      updateQuery: (prevResult, { fetchMoreResult: nextResult }) => {
        if (!nextResult) return prevResult;
        return {
          ...prevResult,
          pageOfProducts: [
            ...prevResult.pageOfProducts,
            ...nextResult.pageOfProducts
          ]
        };
      }
    });

    setIsLoadingMore(false);
  }, [hasMore, variables, fetchMore, productUnits.length]);

  return {
    loading,
    productUnits: (productUnits || []).map(mapProductUnit),
    hasMore,
    refetch,
    loadMore,
    isLoadingMore
  };
};
