export const putProductView = async (parent, args, context) => {
  const { productView } = args;
  const result = await context.dataSource.productView.putProductView(
    productView
  );

  return result;
};
