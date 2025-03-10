export const putProductOptionAndValues = async (parent, args, context) => {
  const { input } = args;
  const result = await context.dataSource.product.putProductOptionAndValues(
    input
  );

  return result;
};
