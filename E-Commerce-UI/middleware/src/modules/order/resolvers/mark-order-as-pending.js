export const markOrderAsPending = async (parent, args, context) => {
  const { draftId } = args;
  const result = await context.dataSource.order.markOrderAsPending(draftId);

  return result;
};
