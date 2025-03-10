export const getUserAddresses = async (parent, args, context) => {
  const { id } = parent;
  const addresses = await context.dataSource.user.getUserAddresses(id);

  return addresses;
};
