export const deleteAddress = async (parent, args, context) => {
  const { userId, addressId } = args;
  const res = await context.dataSource.user.deleteAddress(userId, addressId);

  return res;
};
