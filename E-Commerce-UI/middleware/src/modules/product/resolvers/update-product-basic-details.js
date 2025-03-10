export const updateProductBasicDetails = async (parent, args, context) => {
  const { productId, input } = args;
  const result = await context.dataSource.product.updateProductBasicDetails(
    productId,
    input
  );

  return result;
};
