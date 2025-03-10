export const getPaymentStatus = async (parent, args, context) => {
  const { draftId, orderId } = args;
  const preview = await context.dataSource.order.getPaymentStatus(
    draftId,
    orderId
  );

  return preview;
};
