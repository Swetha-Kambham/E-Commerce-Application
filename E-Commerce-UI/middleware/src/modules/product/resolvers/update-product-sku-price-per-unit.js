export const updateProductSKUPricePerUnit = async (parent, args, context) => {
  const { productId, skuId, pricePerUnit } = args;
  const result = await context.dataSource.product.updateProductSKUPricePerUnit(
    productId,
    skuId,
    pricePerUnit
  );

  return result;
};
