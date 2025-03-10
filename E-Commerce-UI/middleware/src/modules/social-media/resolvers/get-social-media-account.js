export const getSocialMediaAccount = async (parent, args, context) => {
  const { id } = args;
  const socialMedia =
    await context.dataSource.socialMedia.getSocialMediaAccount(id);

  return socialMedia;
};
