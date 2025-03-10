export const updateProductLocationTag = async (parent, args, context) => {
  const { productId, locationTags } = args;
  const result = await context.dataSource.product.updateProductLocationTag(
    productId,
    locationTags
  );

  return result;
};
