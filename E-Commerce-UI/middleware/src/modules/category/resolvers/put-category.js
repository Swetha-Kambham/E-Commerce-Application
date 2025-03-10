export const putCategory = async (parent, args, context) => {
  const { id, categoryInput } = args;
  const res = await context.dataSource.category.putCategory(id, categoryInput);

  return res;
};
