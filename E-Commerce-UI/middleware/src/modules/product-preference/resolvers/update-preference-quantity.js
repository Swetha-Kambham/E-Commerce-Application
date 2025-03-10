export const updatePreferenceQuantity = async (parent, args, context) => {
  const { preferenceId, quantity } = args;
  const result =
    await context.dataSource.productPreference.updatePreferenceQuantity(
      preferenceId,
      quantity
    );

  return result;
};
