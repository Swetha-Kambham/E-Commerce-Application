export const getProductDetails = async (parent, args, context) => {
  const { id } = args;
  const product = await context.dataSource.product.getProductDetails(id);

  return product;
};
