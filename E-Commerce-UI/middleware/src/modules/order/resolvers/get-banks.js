export const getBanks = async (parent, args, context) => {
  const banks = await context.dataSource.order.getBanks();

  return banks;
};
