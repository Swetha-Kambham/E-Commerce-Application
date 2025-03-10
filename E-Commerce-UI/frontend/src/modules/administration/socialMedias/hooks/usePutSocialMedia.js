import { useMutation, gql } from '@apollo/client';

const PUT_SOCIAL_MEDIA = gql`
  mutation putSocialMediaAccount($id: String, $input: SocialMediaInput) {
    putSocialMediaAccount(id: $id, input: $input)
  }
`;

export const usePutSocialMedia = () => {
  const [putSocialMedia] = useMutation(PUT_SOCIAL_MEDIA);

  return {
    putSocialMedia: async ({ id, input }) => {
      await putSocialMedia({
        variables: { id, input },
        refetchQueries: ['socialMedias']
      });
    }
  };
};
