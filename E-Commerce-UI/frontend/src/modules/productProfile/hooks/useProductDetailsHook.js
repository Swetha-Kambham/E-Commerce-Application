import { useState, useCallback } from 'react';
import { productPreferences, Roles } from 'modules/common/enums';

export const useProductDetailsHook = ({
  me,
  isAuthenticated,
  role,
  addToCart,
  skuId,
  productId,
  quantity: quantityInStock
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState();
  const [isCheckoutProgress, setIsCheckoutProgress] = useState(false);
  const [isCartSuccessAlertOpen, setIsCartSuccessAlertOpen] = useState(false);
  const [isQuantityErrorAlertOpen, setIsQuantityErrorAlertOpen] =
    useState(false);
  const [isLoingInfoAlertOpen, setIsLoingInfoAlertOpen] = useState(false);

  const handleQuantityErrorAlertOpenClick = useCallback(() => {
    setIsQuantityErrorAlertOpen(true);
  }, []);

  const handleQuantityErrorAlertOpenClose = useCallback(() => {
    setIsQuantityErrorAlertOpen(false);
  }, []);

  const handleCartSuccessAlertClick = useCallback(() => {
    setIsCartSuccessAlertOpen(true);
  }, []);

  const handleCartSuccessAlertClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsCartSuccessAlertOpen(false);
  }, []);

  const handleLoingInfoAlertClick = useCallback(() => {
    setIsLoingInfoAlertOpen(true);
  }, []);

  const handleLoingInfoAlertClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsLoingInfoAlertOpen(false);
  }, []);

  const handleQuantityChange = useCallback(
    (value) => {
      if (quantityInStock < value) {
        handleQuantityErrorAlertOpenClick();
      } else {
        setQuantity(value);
      }
    },
    [handleQuantityErrorAlertOpenClick, quantityInStock]
  );

  const handleAddToCartClick = useCallback(async () => {
    if (!isAuthenticated || role !== Roles.user) {
      handleLoingInfoAlertClick();
      return;
    }
    setIsAddingToCart(true);

    const res = await addToCart({
      userId: me?.id,
      productId,
      skuId,
      quantity: quantity ? parseInt(quantity) : null,
      type: productPreferences.cart
    });

    if (res) {
      handleCartSuccessAlertClick();
      setIsAddingToCart(false);
    }
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 15000);
  }, [
    addToCart,
    handleCartSuccessAlertClick,
    handleLoingInfoAlertClick,
    isAuthenticated,
    me,
    productId,
    quantity,
    role,
    skuId
  ]);

  return {
    handleCartSuccessAlertClick,
    handleCartSuccessAlertClose,
    isCartSuccessAlertOpen,
    handleLoingInfoAlertClick,
    handleLoingInfoAlertClose,
    isQuantityErrorAlertOpen,
    handleQuantityErrorAlertOpenClick,
    handleQuantityErrorAlertOpenClose,
    isLoingInfoAlertOpen,
    quantity,
    handleQuantityChange,
    handleAddToCartClick,
    isAddingToCart,
    isCheckoutProgress,
    setIsCheckoutProgress
  };
};
