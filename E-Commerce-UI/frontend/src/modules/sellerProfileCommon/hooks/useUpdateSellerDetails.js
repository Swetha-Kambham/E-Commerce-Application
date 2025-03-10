import { useMutation, gql } from '@apollo/client';

const UPDATE_SELLER_DETAILS = gql`
  mutation updateSellerDetails($sellerId: String!, $input: SellerInput) {
    updateSellerDetails(sellerId: $sellerId, input: $input)
  }
`;

export const useUpdateSellerDetails = () => {
  const [updateSellerDetails] = useMutation(UPDATE_SELLER_DETAILS);

  return {
    updateSellerDetails: async ({ sellerId, input }) => {
      const res = await updateSellerDetails({
        variables: { sellerId, input },
        refetchQueries: ['sellerDetails']
      });

      return res;
    }
  };
};
