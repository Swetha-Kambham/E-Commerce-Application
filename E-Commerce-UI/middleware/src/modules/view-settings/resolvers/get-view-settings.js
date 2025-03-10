export const getViewSettings = async (parent, args, context) => {
  const { id, name } = args;
  const res = await context.dataSource.viewSettings.getViewSettings({
    id: id,
    name: name
  });

  return res;
};
