import { useCallback } from 'react';
import axios from 'axios';
import get from 'lodash.get';
import { useApolloClient, gql } from '@apollo/client';

export const SIGNED_URL_FOR_PRODUCT_VIEW_IMAGES_UPLOAD = gql`
  query signedUrlForProductViewImagesUpload(
    $id: String!
    $images: [SignedUrlForUploadImageInput]!
  ) {
    signedUrlForProductViewImagesUpload(id: $id, images: $images) {
      id
      url
      file
    }
  }
`;

export const useUploadObject = ({
  image,
  setFieldValue,
  onClose,
  setIsSubmitting
}) => {
  const client = useApolloClient();

  const upload = useCallback(
    async ({ url }) => {
      axios
        .request({
          headers: {
            'Content-Type': image?.file?.type || 'image/jpeg'
          },
          method: 'put',
          url,
          data: image?.file,
          onUploadProgress: (p) => {
            setFieldValue('image.inProgress', true);
            setFieldValue('image.percentage', (100 * p.loaded) / p.total);
          }
        })
        .then((res) => {
          setFieldValue('image.inProgress', false);
          setFieldValue('image.percentage', null);
          onClose();
          setIsSubmitting(false);
        })
        .catch((err) => {
          setFieldValue('image.inProgress', false);
          setFieldValue('image.percentage', null);
          setFieldValue('image.error', 'Error occured while uploading image');
        });
    },
    [image.file, onClose, setFieldValue, setIsSubmitting]
  );

  const getObjectUrl = useCallback(
    async ({ id }) => {
      if (image?.file?.name && id) {
        const { data } = await client.query({
          query: SIGNED_URL_FOR_PRODUCT_VIEW_IMAGES_UPLOAD,
          variables: {
            id,
            images: [
              { fileName: image?.file?.name, contentType: image?.file?.type }
            ]
          },
          fetchPolicy: 'network-only'
        });

        const urls = get(data, 'signedUrlForProductViewImagesUpload', []);

        return urls;
      }

      return null;
    },
    [client, image]
  );

  return { upload, getObjectUrl };
};
