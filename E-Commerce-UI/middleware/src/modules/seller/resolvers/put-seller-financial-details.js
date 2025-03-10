export const putSellerFinancialDetails = async (parent, args, context) => {
  const { sellerId, sellerFinancialDetails } = args;
  const res = await context.dataSource.seller.putSellerFinancialDetails(
    sellerId,
    sellerFinancialDetails
  );

  return res;
};
