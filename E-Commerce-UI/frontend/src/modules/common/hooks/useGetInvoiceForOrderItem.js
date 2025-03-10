import { gql } from '@apollo/client';
import get from 'lodash.get';

export const INVOICE_FOR_ORDER_ITEM = gql`
  query invoiceForOrderItem($orderId: String!, $orderItemId: String!) {
    invoiceForOrderItem(orderId: $orderId, orderItemId: $orderItemId)
  }
`;

export const useGetInvoiceForOrderItem = ({ client } = {}) => {
  return {
    getBase64String: async ({ orderId, orderItemId }) => {
      const { data } = await client.query({
        query: INVOICE_FOR_ORDER_ITEM,
        variables: {
          orderId,
          orderItemId
        },
        fetchPolicy: 'network-only'
      });

      const base64String = get(data, 'invoiceForOrderItem', null);

      return base64String;
    }
  };
};
