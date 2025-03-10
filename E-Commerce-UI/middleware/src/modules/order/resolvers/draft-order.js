export const draftOrder = async (parent, args, context) => {
  const { orderInput } = args;
  const draftId = await context.dataSource.order.draftOrder(orderInput);

  return draftId;
};
