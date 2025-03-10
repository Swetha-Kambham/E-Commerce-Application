export const deleteViewSettings = async (parent, args, context) => {
  const { id, name } = args;
  const res = await context.dataSource.viewSettings.deleteViewSettings({
    id: id,
    name: name
  });

  return res;
};
