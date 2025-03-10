import { useCallback } from 'react';
import { useMarkOrderAsConfirmed } from './useMarkOrderAsConfirmed';

export const useOrderConfirmationHook = ({
  isPayOnDeliveryOrder,
  orderId,
  setInProgress,
  setIsSuccess
}) => {
  const onCompleted = useCallback(
    (isSucceded) => {
      if (isSucceded) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      setInProgress(false);
    },
    [setInProgress, setIsSuccess]
  );

  const { markOrderAsConfirmed } = useMarkOrderAsConfirmed({ onCompleted });

  const handleConfirmOrder = useCallback(() => {
    if (
      (isPayOnDeliveryOrder === null || isPayOnDeliveryOrder === undefined) &&
      (orderId === null || orderId === undefined)
    ) {
      setInProgress(false);
      return;
    }

    if (orderId && isPayOnDeliveryOrder === 'true') {
      markOrderAsConfirmed({
        draftId: orderId,
        isPayOnDeliveryOrder: true
      });
      return;
    }
    if (orderId && isPayOnDeliveryOrder !== 'true') {
      markOrderAsConfirmed({
        orderId,
        isPayOnDeliveryOrder: false
      });
    }
  }, [isPayOnDeliveryOrder, markOrderAsConfirmed, orderId, setInProgress]);

  return { handleConfirmOrder };
};
