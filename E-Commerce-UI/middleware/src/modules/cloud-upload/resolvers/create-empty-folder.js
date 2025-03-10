export const createEmptyFolder = async (parent, args, context) => {
  const { key } = args;

  const response = await context.dataSource.awsS3.createEmptyFolder(key);

  return response;
};
