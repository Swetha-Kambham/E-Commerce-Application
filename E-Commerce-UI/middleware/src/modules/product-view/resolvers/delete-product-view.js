export const deleteProductView = async (parent, args, context) => {
  const { id, name } = args;
  const result = await context.dataSource.productView.deleteProductView(
    id,
    name
  );

  return result;
};
