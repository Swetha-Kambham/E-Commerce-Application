export const getSignedUrlsForUploadImages = async (parent, args, context) => {
  const { productId, skuId, inputs } = args;

  const urls = await context.dataSource.awsS3.getSignedUrlsForImagesUpload(
    productId,
    skuId,
    inputs
  );

  return urls;
};
