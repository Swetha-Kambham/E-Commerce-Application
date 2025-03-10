import { useCallback } from 'react';
import axios from 'axios';

export const useUploadImages = ({
  refetchSignedUrls,
  images,
  refetchProduct,
  setFieldValue,
  closeUploadDialog,
  resetForm,
  sellerId,
  skuId
}) => {
  const upload = useCallback(
    async (urls) => {
      Promise.all(
        (images || []).map((image, index) =>
          axios.request({
            method: 'put',
            url: urls[index],
            data: image.file,
            onUploadProgress: (p) => {
              setFieldValue(`images[${index}].inProgress`, true);
              setFieldValue(
                `images[${index}].percentage`,
                (100 * p.loaded) / p.total
              );
            }
          })
        )
      ).then((res) =>
        res.map((r, index) => {
          setFieldValue(`images[${index}].inProgress`, false);
          setFieldValue(`images[${index}].percentage`, 0);

          closeUploadDialog();
          resetForm();
          refetchProduct();
          return r;
        })
      );
    },
    [setFieldValue, images, closeUploadDialog, resetForm, refetchProduct]
  );

  const onSaveImages = useCallback(async () => {
    const res = await refetchSignedUrls({
      skuId,
      inputs: (images || []).map((image) => ({
        fileName: image.file.name,
        metadata: { sellerId }
      }))
    });

    if (res && res.data && res.data.signedUrlsForUploadImages) {
      upload(res.data.signedUrlsForUploadImages);
    }
  }, [images, refetchSignedUrls, sellerId, upload, skuId]);

  return {
    onSaveImages
  };
};
