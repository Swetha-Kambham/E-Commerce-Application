import { v4 } from 'uuid';

export const getSellerById = async (parent, args, context) => {
  const { sellerId } = args;
  const seller = await context.dataSource.seller.getSellerById(sellerId);

  return { ...seller, address: { ...seller.address, id: v4() } };
};
