import { useMutation, gql } from '@apollo/client';

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;

export const useDeleteCategory = () => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  return {
    deleteCategory: async ({ id }) => {
      await deleteCategory({
        variables: { id },
        refetchQueries: ['categories']
      });
    }
  };
};
