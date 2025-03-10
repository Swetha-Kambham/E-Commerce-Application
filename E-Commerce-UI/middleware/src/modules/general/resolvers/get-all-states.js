export const getAllStates = async (parent, args, context) => {
  const res = await context.dataSource.general.getAllStates();
  return res;
};
