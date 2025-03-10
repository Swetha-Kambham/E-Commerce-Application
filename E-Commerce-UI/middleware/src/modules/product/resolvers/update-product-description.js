export const updateProductDescription = async (parent, args, context) => {
  const { productId, description } = args;
  const result = await context.dataSource.product.updateProductDescription(
    productId,
    description
  );

  return result;
};
