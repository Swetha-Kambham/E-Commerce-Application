export const getAllUsers = async (parent, args, context) => {
  const users = await context.dataSource.user.getAllUsers();

  return users;
};
