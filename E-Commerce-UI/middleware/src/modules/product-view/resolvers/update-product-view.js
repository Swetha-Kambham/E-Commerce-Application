export const updateProductView = async (parent, args, context) => {
  const { id, productView } = args;
  const result = await context.dataSource.productView.updateProductView(
    id,
    productView
  );

  return result;
};
