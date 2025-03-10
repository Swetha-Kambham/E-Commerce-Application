export const logout = async (parent, args, context) => {
  const { input } = args;
  const res = await context.dataSource.auth.logout(input);

  return res;
};
