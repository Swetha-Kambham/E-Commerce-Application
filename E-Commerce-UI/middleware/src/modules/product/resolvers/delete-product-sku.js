export const deleteProductSKU = async (parent, args, context) => {
  const { productId, skuId } = args;
  const result = await context.dataSource.product.deleteProductSKU(
    productId,
    skuId
  );

  return result;
};
