export const updateSellerDetails = async (parent, args, context) => {
  const { sellerId, input } = args;
  const res = await context.dataSource.seller.updateSellerDetails(
    sellerId,
    input
  );

  return res;
};
