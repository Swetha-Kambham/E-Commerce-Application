export const updatePassword = async (parent, args, context) => {
  const { userId, newPassword } = args;
  const res = await context.dataSource.user.updatePassword(userId, newPassword);

  return res;
};
