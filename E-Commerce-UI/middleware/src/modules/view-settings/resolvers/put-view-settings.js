export const putViewSettings = async (parent, args, context) => {
  const { id, name, input } = args;
  const res = await context.dataSource.viewSettings.putViewSettings({
    id: id,
    name: name,
    input: input
  });

  return res;
};
