export const putSeller = async (parent, args, context) => {
  const { id, input } = args;
  const res = await context.dataSource.seller.putSeller(id, input);

  return res;
};
