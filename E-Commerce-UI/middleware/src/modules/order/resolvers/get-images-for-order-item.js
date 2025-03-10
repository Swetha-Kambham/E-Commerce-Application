export const getImagesForOrderItem = async (parent, args, context) => {
  const { id: orderItemId, orderId } = parent;

  const productUnit =
    await context.dataSource.order.getProductUnitReferenceForOrderItem(
      orderId,
      orderItemId
    );

  if (productUnit && productUnit.productId && productUnit.skuId) {
    const imageUrls = await context.dataSource.product.getImageUrlsForSKUs(
      productUnit.productId,
      [productUnit.skuId]
    );

    return imageUrls[productUnit.skuId];
  }

  return [];
};
