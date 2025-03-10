export const deleteProductOption = async (parent, args, context) => {
  const { input } = args;
  const result = await context.dataSource.product.deleteProductOption(input);

  return result;
};
