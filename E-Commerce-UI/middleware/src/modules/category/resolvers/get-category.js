export const getCategory = async (parent, args, context) => {
  const { id } = args;
  const category = await context.dataSource.category.getCategory(id);

  return category;
};
