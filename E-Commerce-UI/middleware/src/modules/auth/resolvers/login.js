export const login = async (parent, args, context) => {
  const { input } = args;
  const res = await context.dataSource.auth.login(input);

  return res;
};
