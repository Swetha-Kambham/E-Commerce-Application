export const getAllSellers = async (parent, args, context) => {
  const seller = await context.dataSource.seller.getAllSellers();

  return seller;
};
