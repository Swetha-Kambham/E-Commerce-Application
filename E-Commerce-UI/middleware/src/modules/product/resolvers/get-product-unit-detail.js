export const getProductUnitDetail = async (parent, args, context) => {
  const { productId, productSlug, skuId, sku } = args;
  const res = await context.dataSource.product.getProductUnitDetail(
    productId,
    productSlug,
    skuId,
    sku
  );

  return res;
};
