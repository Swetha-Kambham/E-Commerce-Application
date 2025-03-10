import { useMutation, gql } from '@apollo/client';

const PUT_SOCIAL_MEDIA = gql`
  mutation putCategory($id: String, $categoryInput: CategoryInput) {
    putCategory(id: $id, categoryInput: $categoryInput)
  }
`;

export const usePutCategory = () => {
  const [putCategory] = useMutation(PUT_SOCIAL_MEDIA);

  return {
    putCategory: async ({ id, categoryInput }) => {
      await putCategory({
        variables: { id, categoryInput },
        refetchQueries: ['categories']
      });
    }
  };
};
