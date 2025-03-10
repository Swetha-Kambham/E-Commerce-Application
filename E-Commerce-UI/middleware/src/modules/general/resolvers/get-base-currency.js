export const getBaseCurrency = async (parent, args, context) => {
  const res = await context.dataSource.general.getBaseCurrency();
  return res;
};
