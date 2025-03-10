export const markOrderAsConfirmed = async (parent, args, context) => {
  const { draftId, orderId, isPayOnDeliveryOrder } = args;
  const result = await context.dataSource.order.markOrderAsConfirmed(
    draftId,
    orderId,
    isPayOnDeliveryOrder
  );

  return result;
};
