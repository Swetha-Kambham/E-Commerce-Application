import { useQuery, gql } from '@apollo/client';

const GET_SIGNED_URL = gql`
  query signedUrlsForUploadImages(
    $productId: String!
    $skuId: String
    $inputs: [SignedUrlForUploadImageInput!]
  ) {
    signedUrlsForUploadImages(
      productId: $productId
      skuId: $skuId
      inputs: $inputs
    )
  }
`;
export const useGetSignedUrls = ({ productId }) => {
  const { loading, refetch } = useQuery(GET_SIGNED_URL, {
    variables: { productId, skuId: null, inputs: [] },
    skip: true,
    fetchPolicy: 'network-only'
  });

  return {
    loading,
    refetchSignedUrls: refetch
  };
};
