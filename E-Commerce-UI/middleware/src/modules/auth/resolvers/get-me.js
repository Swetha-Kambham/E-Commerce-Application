export const getMe = (parent, args, context) => {
  return context.dataSource.auth.getCurrentUser();
};
