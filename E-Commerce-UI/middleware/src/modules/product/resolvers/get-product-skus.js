export const getProductSkus = async (parent, args, context) => {
  const { id: productId, productSKUs } = parent;

  const productSKUIds = (productSKUs || []).map((sku) => sku.id);

  const urlsBySKUId = await context.dataSource.product.getImageUrlsForSKUs(
    productId,
    productSKUIds
  );

  return productSKUs.map((productSKU) => ({
    ...productSKU,
    images: urlsBySKUId[productSKU.id]
  }));
};
