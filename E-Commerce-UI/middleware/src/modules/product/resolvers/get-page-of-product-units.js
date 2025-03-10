export const getPageOfProductUnits = async (parent, args, context) => {
  const { page, pageSize, filters } = args;
  const productUnits = await context.dataSource.product.getPageOfProductUnits(
    page,
    pageSize,
    filters
  );

  return productUnits;
};
