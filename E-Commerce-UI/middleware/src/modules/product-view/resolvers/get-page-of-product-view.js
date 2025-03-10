export const getPageOfProductView = async (parent, args, context) => {
  const { page, pageSize, filters } = args;
  const result = await context.dataSource.productView.getPageOfProductView(
    page,
    pageSize,
    filters
  );

  return result;
};
