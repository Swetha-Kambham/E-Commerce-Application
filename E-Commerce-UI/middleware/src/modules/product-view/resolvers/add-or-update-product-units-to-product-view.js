export const addOrUpdateProductUnitsToProductView = async (
  parent,
  args,
  context
) => {
  const { id, productUnits } = args;
  const result =
    await context.dataSource.productView.addOrUpdateProductUnitsToProductView(
      id,
      productUnits
    );

  return result;
};
