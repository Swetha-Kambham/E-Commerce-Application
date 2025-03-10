export const putProduct = async (parent, args, context) => {
  const { id, input } = args;
  const res = await context.dataSource.product.putProduct(id, input);

  return res;
};
