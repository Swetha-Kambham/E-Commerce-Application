import { v4 } from 'uuid';
export const getSignedUrlForProductSKUImages = async (
  parent,
  args,
  context
) => {
  const { productId, skuId, images } = args;
  const result =
    await context.dataSource.product.getSignedUrlForProductSKUImages(
      productId,
      skuId,
      images
    );

  return (result || []).map((r) => ({ ...r, id: v4() }));
};
