export const updateProductSKUSellingPricePerUnit = async (
  parent,
  args,
  context
) => {
  const { productId, skuId, sellingPricePerUnit } = args;
  const result =
    await context.dataSource.product.updateProductSKUSellingPricePerUnit(
      productId,
      skuId,
      sellingPricePerUnit
    );

  return result;
};
