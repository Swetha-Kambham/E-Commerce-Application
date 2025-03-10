export const getProductView = async (parent, args, context) => {
  const { id } = args;
  const result = await context.dataSource.productView.getProductViewDetails(id);

  return result;
};
