import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

export const PRODUCT_UNIT_DETAIL = gql`
  query productUnitDetail(
    $productId: String
    $productSlug: String
    $skuId: String
    $sku: String
  ) {
    productUnitDetail(
      productId: $productId
      productSlug: $productSlug
      skuId: $skuId
      sku: $sku
    ) {
      id
      productId
      name
      slug
      commonName
      description
      category {
        id
        name
      }
      seller {
        id
        name
        displayName: storeName
      }
      skuId
      sku
      quantity: quantityInStock
      currency {
        id
        code
        symbol
        name
      }
      pricePerUnit
      sellingPricePerUnit
      specifications {
        option
        value
        optionId
        valueId
      }
      images {
        key
        url
      }
    }
  }
`;

export const useProductUnitDetail = ({
  productId,
  productSlug,
  skuId,
  sku
}) => {
  const { loading, data } = useQuery(PRODUCT_UNIT_DETAIL, {
    variables: {
      productId,
      productSlug,
      skuId,
      sku,
      key: null,
      limit: 20
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  const productUnit = get(data, 'productUnitDetail', {});

  return {
    loading,
    productUnit
  };
};
