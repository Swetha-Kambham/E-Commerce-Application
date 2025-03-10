export const putProductPreference = async (parent, args, context) => {
  const { userId, skuId, productId, quantity, type } = args;
  const result =
    await context.dataSource.productPreference.putProductPreference(
      userId,
      productId,
      skuId,
      quantity,
      type
    );

  return result;
};
