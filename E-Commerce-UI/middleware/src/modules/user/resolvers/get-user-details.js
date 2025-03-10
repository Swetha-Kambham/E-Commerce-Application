export const getUserById = async (parent, args, context) => {
  const { id } = args;

  const user = await context.dataSource.user.getUserById(id);

  return user;
};
