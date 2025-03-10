import { useApolloClient, gql } from '@apollo/client';

const SIGNED_URL_FOR_PRODUCT_SKU_IMAGES = gql`
  query signedUrlForProductSKUImages(
    $productId: String!
    $skuId: String!
    $images: [SignedUrlForUploadImageInput]
  ) {
    signedUrlForProductSKUImages(
      productId: $productId
      skuId: $skuId
      images: $images
    ) {
      id
      url
      file
      path
    }
  }
`;
export const useGetSignedUrlForProductSKUImages = () => {
  const apolloClient = useApolloClient();

  return {
    getSignedUrlForProductSKUImages: async ({ productId, skuId, images }) => {
      const { data } = await apolloClient.query({
        query: SIGNED_URL_FOR_PRODUCT_SKU_IMAGES,
        variables: {
          productId,
          skuId,
          images: (images || []).map((image) => ({
            fileName: image.file.name,
            contentType: image.file.type
          }))
        },
        errorPolicy: 'all'
      });

      return data?.signedUrlForProductSKUImages;
    }
  };
};
