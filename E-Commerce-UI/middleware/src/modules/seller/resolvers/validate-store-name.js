export const validateStoreName = async (parent, args, context) => {
  const { storeName } = args;
  const res = await context.dataSource.seller.validateStoreName(storeName);
  return res;
};
