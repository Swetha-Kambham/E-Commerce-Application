import { v4 } from 'uuid';

export const getSignedUrlsForObjectDownload = async (parent, args, context) => {
  const { objectKeys, contentType } = args;

  const urls = await context.dataSource.awsS3.getSignedUrlsForImagesDownload2(
    objectKeys,
    contentType
  );

  return urls.map((url) => ({ ...url, id: v4() }));
};
