export const validateEmailAddress = async (parent, args, context) => {
  const { emailAddress, role } = args;

  if (role === 'USER') {
    const res = await context.dataSource.user.validateEmailAddress(
      emailAddress
    );
    return res;
  }

  if (role === 'SELLER') {
    const res = await context.dataSource.seller.validateEmailAddress(
      emailAddress
    );
    return res;
  }
  return null;
};
