export const completePhoneVerification = async (parent, args, context) => {
  const { phoneNumber, serviceSId, verificationCode } = args;
  const res = await context.dataSource.auth.completePhoneVerification(
    phoneNumber,
    serviceSId,
    verificationCode
  );

  return res;
};
