export const getApps = async (parent, args, context) => {
  const apps = await context.dataSource.order.getApps();

  return apps;
};
