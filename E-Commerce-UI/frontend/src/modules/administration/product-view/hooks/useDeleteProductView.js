import { useMutation, gql } from '@apollo/client';

const DELETE_PRODUCT_VIEW = gql`
  mutation deleteProductView($id: String!, $name: String!) {
    deleteProductView(id: $id, name: $name)
  }
`;

export const useDeleteProductView = () => {
  const [deleteProductView] = useMutation(DELETE_PRODUCT_VIEW);

  return {
    deleteProductView: async ({ id, name }) => {
      await deleteProductView({
        variables: { id, name },
        refetchQueries: ['getPageOfProductView']
      });
    }
  };
};
