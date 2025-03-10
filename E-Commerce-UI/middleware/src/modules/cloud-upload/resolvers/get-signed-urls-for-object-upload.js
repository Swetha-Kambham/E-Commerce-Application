import { v4 } from 'uuid';

export const getSignedUrlsForObjectUpload = async (parent, args, context) => {
  const { objectKeys, contentType } = args;

  const urls = await context.dataSource.awsS3.getSignedUrlsForImagesUpload2(
    objectKeys,
    contentType
  );

  return urls.map((url) => ({ ...url, id: v4() }));
};
