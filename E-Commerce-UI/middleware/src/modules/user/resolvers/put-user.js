export const putUser = async (parent, args, context) => {
  const { id, input } = args;
  const res = await context.dataSource.user.putUser(id, input);

  return res;
};
