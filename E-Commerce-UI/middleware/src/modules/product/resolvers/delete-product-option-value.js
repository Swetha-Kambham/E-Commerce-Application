export const deleteProductOptionValue = async (parent, args, context) => {
  const { input } = args;
  const result = await context.dataSource.product.deleteProductOptionValue(
    input
  );

  return result;
};
