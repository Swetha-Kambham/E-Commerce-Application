export const getPaymentToken = async (parent, args, context) => {
  const { draftId, returnUrl, paymentMethods } = args;
  const signature = await context.dataSource.order.getPaymentToken(
    draftId,
    returnUrl,
    paymentMethods
  );
  return signature;
};
