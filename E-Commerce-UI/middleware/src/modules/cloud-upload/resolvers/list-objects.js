export const getListOfObjects = async (parent, args, context) => {
  const { prefix, maxKey } = args;

  const urls = await context.dataSource.awsS3.listObjects(prefix, maxKey);

  return urls.map((url) => ({ ...url, id: url.key }));
};
