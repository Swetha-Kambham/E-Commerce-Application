import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';
import { orderBy } from 'lodash';

export const PRODUCT_DETAILS = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      commonName
      description
      tags
      locationTags
      seller {
        id
        name
        storeName
      }
      category {
        id
        name
      }
      productOptionAndValues {
        option {
          id
          name
        }
        values {
          id
          name
        }
      }
      productSkus {
        id
        code: sku
        quantity
        currency {
          id
          symbol
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
      status
      statusRemark
      enabled
    }
  }
`;

const mapToProductOptioAndValues = (options = []) =>
  orderBy(
    options.map((o) => ({
      id: o.option.id,
      optionName: o.option.name,
      values:
        o.values && o.values.length
          ? orderBy(
              o.values.map((v) => ({ value: v.name, id: v.id })),
              ['value'],
              ['asc']
            )
          : []
    })),
    ['optionName'],
    ['asc']
  );

export const useProductDetails = ({ productId }) => {
  const { loading, data, refetch } = useQuery(PRODUCT_DETAILS, {
    variables: {
      id: productId
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  const product = get(data, 'product', {});

  return {
    loading,
    product: {
      ...product,
      productOptionAndValues: mapToProductOptioAndValues(
        product.productOptionAndValues
      )
    },
    refetchProduct: refetch
  };
};
