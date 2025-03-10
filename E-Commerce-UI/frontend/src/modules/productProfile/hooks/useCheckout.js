import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Roles } from 'modules/common/enums';

export const useCheckout = ({
  draftOrder,
  productUnit,
  me,
  quantity,
  role,
  isAuthenticated,
  handleLoingInfoAlertClick,
  setIsCheckoutProgress,
  handleQuantityErrorAlertOpenClick
}) => {
  const history = useHistory();
  const onBuyNowClick = useCallback(async () => {
    if (!isAuthenticated || role !== Roles.user) {
      handleLoingInfoAlertClick();
      return;
    }

    if (!quantity || isNaN(quantity)) {
      handleQuantityErrorAlertOpenClick();
      return;
    }

    setIsCheckoutProgress(true);
    const draftId = await draftOrder({
      userId: me.id,
      billingAddressId: null,
      shippingAddressId: null,
      items: [
        {
          productId: productUnit.productId,
          productSKUId: productUnit.skuId,
          quantity
        }
      ]
    });

    if (draftId) {
      setIsCheckoutProgress(false);
      history.push(`/checkout/${draftId}`);
    }

    setTimeout(() => {
      setIsCheckoutProgress(false);
    }, 15000);
  }, [
    draftOrder,
    handleLoingInfoAlertClick,
    handleQuantityErrorAlertOpenClick,
    history,
    isAuthenticated,
    me,
    productUnit.productId,
    productUnit.skuId,
    quantity,
    role,
    setIsCheckoutProgress
  ]);

  return {
    onBuyNowClick
  };
};
