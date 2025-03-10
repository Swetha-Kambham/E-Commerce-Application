export const validatePhoneNumber = async (parent, args, context) => {
  const { phoneNumber, role } = args;

  if (role === 'USER') {
    const res = await context.dataSource.user.validatePhoneNumber(phoneNumber);
    return res;
  }

  if (role === 'SELLER') {
    const res = await context.dataSource.seller.validatePhoneNumber(
      phoneNumber
    );
    return res;
  }
  return null;
};
