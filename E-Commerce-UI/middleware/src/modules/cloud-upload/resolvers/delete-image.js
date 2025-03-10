export const deleteImage = async (parent, args, context) => {
  const { key } = args;

  const response = await context.dataSource.awsS3.deleteObject(key);

  return response;
};
