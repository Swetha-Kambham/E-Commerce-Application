export const markOrderItemAsCancelled = async (parent, args, context) => {
  const { orderId, orderItemId, reasonForCancel } = args;
  const result = await context.dataSource.order.markOrderItemAsCancelled(
    orderId,
    orderItemId,
    reasonForCancel
  );

  return result;
};
