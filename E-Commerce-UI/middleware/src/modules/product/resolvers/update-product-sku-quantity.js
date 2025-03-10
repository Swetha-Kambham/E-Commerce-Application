export const updateProductSKUQuantity = async (parent, args, context) => {
  const { productId, skuId, quantity } = args;
  const result = await context.dataSource.product.updateProductSKUQuantity(
    productId,
    skuId,
    quantity
  );

  return result;
};
