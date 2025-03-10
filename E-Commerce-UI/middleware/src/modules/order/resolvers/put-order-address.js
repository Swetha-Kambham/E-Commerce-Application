export const putOrderAddress = async (parent, args, context) => {
  const { draftId, addressId } = args;
  const result = await context.dataSource.order.putOrderAddress(
    draftId,
    addressId
  );

  return result;
};
