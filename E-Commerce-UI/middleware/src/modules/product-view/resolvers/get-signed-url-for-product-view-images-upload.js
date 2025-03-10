import { v4 } from 'uuid';
export const getSignedUrlForProductViewImagesUpload = async (
  parent,
  args,
  context
) => {
  const { id, images } = args;
  const result =
    await context.dataSource.productView.getSignedUrlForProductViewImagesUpload(
      id,
      images
    );

  return (result || []).map((r) => ({ ...r, id: v4() }));
};
