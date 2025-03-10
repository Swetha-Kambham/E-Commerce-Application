import { useMutation, gql } from '@apollo/client';

const DELETE_SOCIAL_MEDIA = gql`
  mutation deleteSocialMediaAccount($id: String) {
    deleteSocialMediaAccount(id: $id)
  }
`;

export const useDeleteSocialMedia = () => {
  const [deleteSocialMediaAccount] = useMutation(DELETE_SOCIAL_MEDIA);

  return {
    deleteSocialMediaAccount: async ({ id }) => {
      await deleteSocialMediaAccount({
        variables: { id },
        refetchQueries: ['socialMedias']
      });
    }
  };
};
