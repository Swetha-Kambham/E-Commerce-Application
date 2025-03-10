export const getAllCategories = async (parent, args, context) => {
  const categories = await context.dataSource.category.getAllCategories();

  return categories;
};
