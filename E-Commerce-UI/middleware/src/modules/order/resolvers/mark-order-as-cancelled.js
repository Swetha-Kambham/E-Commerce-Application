export const markOrderAsCancelled = async (parent, args, context) => {
  const { orderId, reasonForCancel } = args;
  const result = await context.dataSource.order.markOrderAsCancelled(
    orderId,
    reasonForCancel
  );

  return result;
};
