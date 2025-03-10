import { useMutation, gql } from '@apollo/client';

const UPDATE_PRODUCT_DESCRIPTION = gql`
  mutation updateProductDescription($productId: String!, $description: String) {
    updateProductDescription(productId: $productId, description: $description)
  }
`;

const UPDATE_PRODUCT_TAG = gql`
  mutation updateProductTag($productId: String!, $tags: [String]) {
    updateProductTag(productId: $productId, tags: $tags)
  }
`;

const UPDATE_PRODUCT_LOCATION_TAG = gql`
  mutation updateProductLocationTag(
    $productId: String!
    $locationTags: [String]
  ) {
    updateProductLocationTag(productId: $productId, locationTags: $locationTags)
  }
`;

export const useUpdateProductField = () => {
  const [updateProductDescription] = useMutation(UPDATE_PRODUCT_DESCRIPTION);
  const [updateProductTag] = useMutation(UPDATE_PRODUCT_TAG);
  const [updateProductLocationTag] = useMutation(UPDATE_PRODUCT_LOCATION_TAG);

  return {
    updateProductDescription: async ({ productId, description }) => {
      const res = await updateProductDescription({
        variables: { productId, description },
        refetchQueries: ['product']
      });

      return res;
    },
    updateProductTag: async ({ productId, tags }) => {
      const res = await updateProductTag({
        variables: { productId, tags },
        refetchQueries: ['product']
      });

      return res;
    },
    updateProductLocationTag: async ({ productId, tags }) => {
      const res = await updateProductLocationTag({
        variables: { productId, locationTags: tags },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};
