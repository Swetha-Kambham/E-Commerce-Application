export const getAllSocialMediaAccounts = async (parent, args, context) => {
  const socialMedias =
    await context.dataSource.socialMedia.getSocialMediaAccounts();

  return socialMedias;
};
