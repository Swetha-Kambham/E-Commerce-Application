export const updatePassword = async (parent, args, context) => {
  const { sellerId, newPassword } = args;
  const res = await context.dataSource.seller.updatePassword(
    sellerId,
    newPassword
  );

  return res;
};
