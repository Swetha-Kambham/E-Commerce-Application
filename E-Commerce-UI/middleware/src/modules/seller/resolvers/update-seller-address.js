export const updateSellerAddress = async (parent, args, context) => {
  const { sellerId, address } = args;
  const res = await context.dataSource.seller.updateSellerAddress(
    sellerId,
    address
  );

  return res;
};
