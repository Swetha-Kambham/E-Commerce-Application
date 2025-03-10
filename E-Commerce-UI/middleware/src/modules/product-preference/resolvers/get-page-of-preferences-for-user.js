export const getPageOfPreferencesForUser = async (parent, args, context) => {
  const { userId, filter } = args;
  const result =
    await context.dataSource.productPreference.getAllPreferencesForUser(
      userId,
      filter
    );

  return result;
};
