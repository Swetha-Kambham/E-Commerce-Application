export const getOrderPreview = async (parent, args, context) => {
  const { draftId, orderId } = args;
  const preview = await context.dataSource.order.getOrderPreview(
    draftId,
    orderId
  );

  return preview;
};
