import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

export const ORDER_PREVIEW = gql`
  query previewOrder($draftId: String, $orderId: String) {
    previewOrder(draftId: $draftId, orderId: $orderId) {
      draftId
      status
      orderTotal
      currency {
        id
        symbol
        name
        code
      }
      user {
        id
        name
        emailAddress
        phoneNumber {
          countryCode
          phoneNumber
        }
      }
      billingAddress {
        id
        name
        addressLine1
      }
      shippingAddress {
        id
        name
      }
      orderItems {
        id
        productName
        originalPrice
        sellingPrice
        totalPrice
        currency {
          id
          symbol
          name
          code
        }
        quantity
      }
    }
  }
`;

export const useOrderPreview = ({ draftId, orderId }) => {
  const { loading, data } = useQuery(ORDER_PREVIEW, {
    variables: {
      draftId,
      orderId
    },
    fetchPolicy: 'cache-and-network'
  });

  const preview = get(data, 'previewOrder', {});

  return {
    loading,
    preview
  };
};
