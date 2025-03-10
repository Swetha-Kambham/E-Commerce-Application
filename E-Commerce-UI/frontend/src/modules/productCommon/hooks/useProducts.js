import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import get from 'lodash.get';
import { PRODUCTS } from 'modules/graphql';

export const useProducts = ({ sellerId }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, data, refetch, fetchMore, variables } = useQuery(PRODUCTS, {
    variables: {
      page: 1,
      pageSize: 20,
      filters: sellerId ? { sellerIds: [sellerId] } : null
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  const products = get(data, 'products', []);

  const hasMore =
    products &&
    products.length > 0 &&
    products.length % variables.pageSize === 0;

  const loadMore = useCallback(async () => {
    if (!hasMore) return;

    setIsLoadingMore(true);

    await fetchMore({
      variables: {
        ...variables,
        page: Math.ceil(products.length / variables.pageSize) + 1
      },
      updateQuery: (prevResult, { fetchMoreResult: nextResult }) => {
        if (!nextResult) return prevResult;
        return {
          ...prevResult,
          products: [...prevResult.products, ...nextResult.products]
        };
      }
    });

    setIsLoadingMore(false);
  }, [hasMore, variables, fetchMore, products.length]);

  return {
    loading,
    products,
    hasMore,
    refetch,
    loadMore,
    isLoadingMore
  };
};
