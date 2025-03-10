import { useMutation, gql } from '@apollo/client';

const DELETE_PRODUCT_OPTION_VALUE = gql`
  mutation deleteProductOptionValue($input: DeleteProductOptionValueInput) {
    deleteProductOptionValue(input: $input)
  }
`;

export const useDeleteProductOptionValue = () => {
  const [deleteProductOptionValue] = useMutation(DELETE_PRODUCT_OPTION_VALUE);

  return {
    deleteProductOptionValue: async ({ input }) => {
      const res = await deleteProductOptionValue({
        variables: { input },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};
