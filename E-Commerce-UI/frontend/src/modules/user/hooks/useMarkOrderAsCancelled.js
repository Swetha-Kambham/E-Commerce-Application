import { useMutation, gql } from '@apollo/client';

const MARK_ORDER_AS_CANCELLED = gql`
  mutation markOrderAsCancelled($orderId: String!, $reasonForCancel: String) {
    markOrderAsCancelled(orderId: $orderId, reasonForCancel: $reasonForCancel)
  }
`;

export const useMarkOrderAsCancelled = () => {
  const [markOrderAsCancelled] = useMutation(MARK_ORDER_AS_CANCELLED);

  return {
    markOrderAsCancelled: async ({ orderId, reasonForCancel }) => {
      const { data } = await markOrderAsCancelled({
        variables: {
          orderId,
          reasonForCancel
        },
        refetchQueries: ['pageOfOrderItems']
      });

      return data?.markOrderAsCancelled;
    }
  };
};
