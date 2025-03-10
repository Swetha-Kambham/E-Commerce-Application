import { useMutation, gql } from '@apollo/client';

const DELETE_IMAGE = gql`
  mutation deleteImage($key: String!) {
    deleteImage(key: $key)
  }
`;

export const useDeleteImage = () => {
  const [deleteImage] = useMutation(DELETE_IMAGE);

  return {
    deleteImage: async ({ key }) => {
      const res = await deleteImage({
        variables: { key },
        refetchQueries: ['product']
      });

      return res;
    }
  };
};
