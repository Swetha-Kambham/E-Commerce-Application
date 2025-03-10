export const verifyVerificationCode = async (parent, args, context) => {
  const {
    role,
    serviceSId,
    emailAddress,
    phoneNumber,
    verificationCode,
    channel
  } = args;
  if (role === 'USER') {
    const res = await context.dataSource.user.verifyVerificationCode({
      serviceSId: serviceSId,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      verificationCode: verificationCode,
      channel: channel
    });

    return res;
  }

  if (role === 'SELLER') {
    const res = await context.dataSource.seller.verifyVerificationCode({
      serviceSId: serviceSId,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      verificationCode: verificationCode,
      channel: channel
    });

    return res;
  }

  return null;
};
