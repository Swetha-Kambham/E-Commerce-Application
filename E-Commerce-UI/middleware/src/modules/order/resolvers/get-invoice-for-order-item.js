export const getInvoiceForOrderItem = async (parent, args, context) => {
  const { orderId, orderItemId } = args;

  const banks = await context.dataSource.order.getInvoiceForOrderItem(
    orderId,
    orderItemId
  );

  return banks;
};
