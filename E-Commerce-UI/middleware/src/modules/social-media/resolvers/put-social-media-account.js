export const putSocialMediaAccount = async (parent, args, context) => {
  const { id, input } = args;
  const res = await context.dataSource.socialMedia.putSocialMediaAccount(
    id,
    input
  );

  return res;
};
