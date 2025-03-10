export const putProductSKU = async (parent, args, context) => {
  const { productId, skuId, skuInput } = args;
  const result = await context.dataSource.product.putProductSKU(
    productId,
    skuId,
    skuInput
  );

  return result;
};
