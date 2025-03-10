export const deleteObjects = async (parent, args, context) => {
  const { objectKeys } = args;

  const response = await context.dataSource.awsS3.deleteObject2(objectKeys);

  return response;
};
