import { useMutation, gql } from '@apollo/client';

const DRAFT_ORDER = gql`
  mutation draftOrder($orderInput: DraftOrderInput) {
    draftOrder(orderInput: $orderInput)
  }
`;

export const useDraftOrder = () => {
  const [draftOrder] = useMutation(DRAFT_ORDER, { errorPolicy: 'all' });

  return {
    draftOrder: async ({
      userId,
      billingAddressId,
      shippingAddressId,
      items
    }) => {
      const result = await draftOrder({
        variables: {
          orderInput: {
            userId,
            billingAddressId,
            shippingAddressId,
            items: (items || []).map((item) => ({
              ...item,
              quantity: parseInt(item.quantity)
            }))
          }
        }
      });

      return result?.data?.draftOrder;
    }
  };
};
