import { useMutation, gql } from '@apollo/client';

const PUT_PRODUCT = gql`
  mutation updateProductBasicDetails(
    $productId: String!
    $input: UpdateProductBasicDetailsInput
  ) {
    updateProductBasicDetails(productId: $productId, input: $input)
  }
`;

export const useUpdateProductBasicDetails = () => {
  const [updateProductBasicDetails] = useMutation(PUT_PRODUCT);

  return {
    updateProductBasicDetails: async ({ productId, input }) => {
      const res = await updateProductBasicDetails({
        variables: { productId, input },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};
