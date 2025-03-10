export const deleteCategory = async (parent, args, context) => {
  const { id } = args;
  const res = await context.dataSource.category.deleteCategory(id);

  return res;
};
