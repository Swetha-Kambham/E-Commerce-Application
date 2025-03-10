import { useMutation, gql } from '@apollo/client';

const DELETE_PRODUCT_OPTION = gql`
  mutation deleteProductOption($input: DeleteProductOptionInput) {
    deleteProductOption(input: $input)
  }
`;

export const useDeleteProductOption = () => {
  const [deleteProductOption] = useMutation(DELETE_PRODUCT_OPTION);

  return {
    deleteProductOption: async ({ input }) => {
      const res = await deleteProductOption({
        variables: { input },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};
