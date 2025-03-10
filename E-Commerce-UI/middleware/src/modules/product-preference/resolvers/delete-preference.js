export const deletePreference = async (parent, args, context) => {
  const { preferenceId } = args;
  const result = await context.dataSource.productPreference.deletePreference(
    preferenceId
  );

  return result;
};
