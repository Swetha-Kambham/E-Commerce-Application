export const deleteSocialMediaAccount = async (parent, args, context) => {
  const { id } = args;
  const res = await context.dataSource.socialMedia.deleteSocialMediaAccount(id);

  return res;
};
