export const initPhoneVerification = async (parent, args, context) => {
  const { phoneNumber } = args;
  const res = await context.dataSource.auth.initPhoneVerification(phoneNumber);

  return res;
};
