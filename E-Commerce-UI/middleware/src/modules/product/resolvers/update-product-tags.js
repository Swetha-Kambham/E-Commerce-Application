export const updateProductTag = async (parent, args, context) => {
  const { productId, tags } = args;
  const result = await context.dataSource.product.updateProductTag(
    productId,
    tags
  );

  return result;
};
