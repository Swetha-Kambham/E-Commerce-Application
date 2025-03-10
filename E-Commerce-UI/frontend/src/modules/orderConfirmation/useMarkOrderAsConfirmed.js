import { useMutation, gql } from '@apollo/client';

const MARK_ORDER_AS_CONFIRMED = gql`
  mutation markOrderAsConfirmed(
    $draftId: String
    $orderId: String
    $isPayOnDeliveryOrder: Boolean
  ) {
    markOrderAsConfirmed(
      draftId: $draftId
      orderId: $orderId
      isPayOnDeliveryOrder: $isPayOnDeliveryOrder
    )
  }
`;

export const useMarkOrderAsConfirmed = ({ onCompleted }) => {
  const [markOrderAsConfirmed] = useMutation(MARK_ORDER_AS_CONFIRMED, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      onCompleted && onCompleted(data.markOrderAsConfirmed);
    }
  });

  return {
    markOrderAsConfirmed: async ({
      draftId,
      isPayOnDeliveryOrder,
      orderId
    }) => {
      const { data } = await markOrderAsConfirmed({
        variables: {
          draftId,
          orderId,
          isPayOnDeliveryOrder
        }
      });

      return data?.markOrderAsConfirmed;
    }
  };
};
