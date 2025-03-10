export const requestVerificationCode = async (parent, args, context) => {
  const { role, id, emailAddress, phoneNumber } = args;
  if (role === 'USER') {
    const res = await context.dataSource.user.requestVerificationCode(
      id,
      emailAddress,
      phoneNumber
    );

    return res;
  }

  if (role === 'SELLER') {
    const res = await context.dataSource.seller.requestVerificationCode(
      id,
      emailAddress,
      phoneNumber
    );

    return res;
  }

  return null;
};
