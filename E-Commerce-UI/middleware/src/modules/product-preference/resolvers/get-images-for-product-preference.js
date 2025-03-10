export const getImagesForProductPreference = async (parent, args, context) => {
  const { skuId, productId } = parent;

  if (productId && skuId) {
    const imageUrls = await context.dataSource.product.getImageUrlsForSKUs(
      productId,
      [skuId]
    );

    return imageUrls[skuId];
  }

  return [];
};
