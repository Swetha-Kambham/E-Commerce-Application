import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';

export const PAYMENT_STATUS = gql`
  query paymentStatus($draftId: String, $orderId: String) {
    paymentStatus(draftId: $draftId, orderId: $orderId) {
      orderId
      cashFreeOrderId
      orderStatus
    }
  }
`;

export const useGetPaymentStatus = ({ draftId, orderId, skip = false }) => {
  const { loading, data, refetch } = useQuery(PAYMENT_STATUS, {
    variables: {
      draftId,
      orderId
    },
    fetchPolicy: 'network-only',
    skip
  });

  const paymentStatus = get(data, 'paymentStatus', {});

  return {
    loading,
    paymentStatus,
    refetch
  };
};
