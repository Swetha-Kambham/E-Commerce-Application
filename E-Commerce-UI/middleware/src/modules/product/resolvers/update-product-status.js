export const updateProductStatus = async (parent, args, context) => {
  const { productId, status, remark } = args;

  const result = await context.dataSource.product.changeProductStatus(
    productId,
    status,
    remark
  );

  return result;
};
