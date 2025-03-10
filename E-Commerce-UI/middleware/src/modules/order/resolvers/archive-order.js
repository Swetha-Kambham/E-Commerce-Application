export const archiveOrder = async (parent, args, context) => {
  const { orderId, draftId } = args;
  const result = await context.dataSource.order.archiveOrder(draftId, orderId);

  return result;
};
