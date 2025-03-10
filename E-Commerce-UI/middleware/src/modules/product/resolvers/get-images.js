export const getImages = (parent, args, context) => {
  // const { id: productId, skuId } = parent;
  // const { key, limit } = args;

  // const imageObjects = await context.dataSource.awsS3.listAllObjects(
  //   key || `${productId}$/{skuId}`,
  //   limit || 1
  // );

  // const images = await context.dataSource.awsS3.getSignedUrlsForImagesDownload(
  //   imageObjects
  // );

  return [
    {
      url: 'http://127.0.0.1:8887/jj-jordan-TN09yTRftZ8-unsplash.jpg',
      key: 'test1'
    },
    {
      url: 'http://127.0.0.1:8887/xps-uWFFw7leQNI-unsplash.jpg',
      key: 'test2'
    },
    {
      url: 'http://127.0.0.1:8887/omid-armin-a6CHxhSiqqA-unsplash.jpg',
      key: 'test3'
    },
    {
      url: 'http://127.0.0.1:8887/solen-feyissa-_1UysItiGR0-unsplash.jpg',
      key: 'test5'
    },
    {
      url: 'http://127.0.0.1:8887/aron-yigin-Hnvvtshep3k-unsplash.jpg',
      key: 'test6'
    }
  ];

  // return images
  //   .filter(
  //     i =>
  //       i.Key.toLocaleLowerCase().endsWith(".jpeg") ||
  //       i.Key.toLocaleLowerCase().endsWith(".jpg")
  //   )
  //   .map(i => ({ url: i.url, key: i.Key }));
};
