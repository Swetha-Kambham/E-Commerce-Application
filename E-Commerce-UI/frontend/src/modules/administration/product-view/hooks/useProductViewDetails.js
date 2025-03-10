import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

const PRODUCTVIEWDETAILS = gql`
  query getProductView($id: String!) {
    getProductView(id: $id) {
      id
      name
      description
      summary
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

export const useProductViewDetails = ({ id }) => {
  const { loading, data } = useQuery(PRODUCTVIEWDETAILS, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only'
  });

  const productView = get(data, 'getProductView', {});

  return {
    loading,
    productView
  };
};
