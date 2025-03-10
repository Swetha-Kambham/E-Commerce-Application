import { useMutation, gql } from '@apollo/client';

const MARK_ORDER_ITEM_AS_CANCELLED = gql`
  mutation markOrderItemAsCancelled(
    $orderId: String!
    $orderItemId: String!
    $reasonForCancel: String
  ) {
    markOrderItemAsCancelled(
      orderId: $orderId
      orderItemId: $orderItemId
      reasonForCancel: $reasonForCancel
    )
  }
`;

export const useMarkOrderItemAsCancelled = () => {
  const [markOrderItemAsCancelled] = useMutation(MARK_ORDER_ITEM_AS_CANCELLED);

  return {
    markOrderItemAsCancelled: async ({
      orderId,
      orderItemId,
      reasonForCancel
    }) => {
      const { data } = await markOrderItemAsCancelled({
        variables: {
          orderId,
          orderItemId,
          reasonForCancel
        },
        refetchQueries: ['pageOfOrderItems']
      });

      return data?.markOrderItemAsCancelled;
    }
  };
};
