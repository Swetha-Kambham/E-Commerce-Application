export const getAllProducts = async (parent, args, context) => {
  const { page, pageSize, filters } = args;
  const products = await context.dataSource.product.getAllProducts(
    page,
    pageSize,
    filters
  );

  return products;
};
