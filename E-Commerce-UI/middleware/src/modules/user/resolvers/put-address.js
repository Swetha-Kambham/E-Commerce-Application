export const putAddress = async (parent, args, context) => {
  const { userId, addressId, address } = args;
  const res = await context.dataSource.user.putAddress(
    userId,
    addressId,
    address
  );

  return res;
};
