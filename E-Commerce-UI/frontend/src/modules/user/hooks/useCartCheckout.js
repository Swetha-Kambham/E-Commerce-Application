import { useCallback, useState } from 'react';
import { useDraftOrder } from 'modules/productProfile/hooks';
import useAuthContext from 'modules/auth';
import { useHistory } from 'react-router-dom';

export const useCartCheckout = ({ records }) => {
  const [isCartCheckoutInProgress, setIsCartCheckoutInProgress] =
    useState(false);

  const history = useHistory();
  const { me } = useAuthContext();
  const { draftOrder } = useDraftOrder();
  const handleCartCheckout = useCallback(async () => {
    setIsCartCheckoutInProgress(true);
    const draftId = await draftOrder({
      userId: me.id,
      billingAddressId: null,
      shippingAddressId: null,
      items: (records || []).map((record) => ({
        productId: record.productId,
        productSKUId: record.skuId,
        quantity: record.quantity
      }))
    });

    if (draftId) {
      history.push(`/checkout/${draftId}`);
      setIsCartCheckoutInProgress(false);
    }

    setTimeout(() => {
      setIsCartCheckoutInProgress(false);
    }, 15000);
  }, [draftOrder, history, me.id, records]);

  return {
    handleCartCheckout,
    isCartCheckoutInProgress
  };
};
