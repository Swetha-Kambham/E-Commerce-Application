import { useMutation, gql } from '@apollo/client';

const ARCHIVE_ORDER = gql`
  mutation archiveOrder($draftId: String, $orderId: String) {
    archiveOrder(draftId: $draftId, orderId: $orderId)
  }
`;

export const useArchiveOrder = () => {
  const [archiveOrder] = useMutation(ARCHIVE_ORDER);

  return {
    archiveOrder: async ({ draftId, orderId }) => {
      const { data } = await archiveOrder({
        variables: {
          draftId,
          orderId
        },
        refetchQueries: ['pageOfOrderItems']
      });

      return data?.archiveOrder;
    }
  };
};
